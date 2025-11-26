import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, onSnapshot, doc, updateDoc, orderBy, query } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// IMPORTANT: Replace with your actual Firebase config
const firebaseConfig = {
    "projectId": "studio-8762209881-fa482",
    "appId": "1:188715334152:web:4c1edd6a3043cd6f806fbd",
    "apiKey": "AIzaSyDZ2GLM3V8LmtKhwfPj84Yt4DL3lTRT1KI",
    "authDomain": "studio-8762209881-fa482.firebaseapp.com",
    "storageBucket": "studio-8762209881-fa482.appspot.com",
    "measurementId": "",
    "messagingSenderId": "188715334152"
};

const ADMIN_EMAIL = "ezcentials@gmail.com";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loadingState = document.getElementById('loading-state');
const emptyState = document.getElementById('empty-state');
const pendingOrdersContainer = document.getElementById('pending-orders');
const processedOrdersContainer = document.getElementById('processed-orders');
const tabPending = document.getElementById('tab-pending');
const tabProcessed = document.getElementById('tab-processed');

let currentTab = 'pending';
let allOrders = [];

function renderOrders() {
    const ordersToRender = allOrders.filter(order => {
        if (currentTab === 'pending') return order.paymentStatus === 'processing';
        if (currentTab === 'processed') return ['completed', 'rejected'].includes(order.paymentStatus);
        return false;
    });

    const container = currentTab === 'pending' ? pendingOrdersContainer : processedOrdersContainer;
    
    // Clear previous content
    pendingOrdersContainer.innerHTML = '';
    processedOrdersContainer.innerHTML = '';


    if (ordersToRender.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    ordersToRender.forEach(order => {
        const card = createOrderCard(order);
        container.innerHTML += card;
    });
    
    attachActionListeners();
}

function getStatusBadge(status) {
    switch (status) {
        case 'processing':
            return `<span class="bg-blue-600 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">En traitement</span>`;
        case 'completed':
            return `<span class="bg-green-600 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Confirmée</span>`;
        case 'rejected':
            return `<span class="bg-red-600 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Rejetée</span>`;
        default:
             return `<span class="bg-yellow-500 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">En attente de paiement</span>`;
    }
}

function createOrderCard(order) {
    const orderDate = order.orderDate?.toDate ? order.orderDate.toDate().toLocaleString('fr-FR') : 'Date inconnue';
    return `
        <div class="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
            <div class="flex-grow">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h2 class="text-xl font-bold text-white">${order.shippingInfo.name}</h2>
                        <p class="text-sm text-gray-400">ID: ${order.id.substring(0,7)}...</p>
                        <p class="text-sm text-gray-400">${orderDate}</p>
                    </div>
                    ${getStatusBadge(order.paymentStatus)}
                </div>
                <div class="mb-4">
                    <p class="text-gray-400"><strong>Email:</strong> ${order.shippingInfo.email}</p>
                    <p class="text-gray-400"><strong>Montant Total:</strong> <span class="font-bold text-lg text-indigo-400">${order.totalAmount.toFixed(2)}€</span></p>
                </div>
                ${order.receiptImageUrl ? `
                    <div class="mb-4">
                        <h4 class="font-semibold text-white mb-2">Preuve de Paiement:</h4>
                        <img src="${order.receiptImageUrl}" alt="Preuve de paiement" class="rounded-md w-full h-auto object-contain max-h-80 cursor-pointer" onclick="window.open('${order.receiptImageUrl}')">
                    </div>
                ` : `
                    <div class="mb-4 text-center p-4 bg-gray-700 rounded-md">
                        <p class="text-yellow-400">Aucune preuve de paiement fournie.</p>
                    </div>
                `}
            </div>
            ${order.paymentStatus === 'processing' ? `
                <div class="mt-auto pt-4 border-t border-gray-700 flex gap-4">
                    <button data-id="${order.id}" class="confirm-btn flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">
                        Confirmer
                    </button>
                    <button data-id="${order.id}" class="reject-btn flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                        Rejeter
                    </button>
                </div>
            ` : ''}
        </div>
    `;
}

function attachActionListeners() {
    document.querySelectorAll('.confirm-btn').forEach(button => {
        button.addEventListener('click', () => updateOrderStatus(button.dataset.id, 'completed'));
    });
    document.querySelectorAll('.reject-btn').forEach(button => {
        button.addEventListener('click', () => updateOrderStatus(button.dataset.id, 'rejected'));
    });
}

async function updateOrderStatus(orderId, newStatus) {
    const orderRef = doc(db, "orders", orderId);
    try {
        await updateDoc(orderRef, { paymentStatus: newStatus });
        console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
        console.error("Error updating order status: ", error);
        alert("Erreur lors de la mise à jour de la commande.");
    }
}


onAuthStateChanged(auth, (user) => {
    if (user && user.email === ADMIN_EMAIL) {
        const q = query(collection(db, "orders"), orderBy("orderDate", "desc"));
        onSnapshot(q, (querySnapshot) => {
            allOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            loadingState.classList.add('hidden');
            renderOrders();
        }, (error) => {
            console.error("Error fetching orders:", error);
            loadingState.innerHTML = `<p class="text-red-500">Erreur de chargement des commandes: ${error.message}</p>`;
        });
    } else {
        window.location.href = '/admin/login.html';
    }
});


document.getElementById('logout-button').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = '/admin/login.html';
    }).catch((error) => {
        console.error('Logout error:', error);
    });
});


tabPending.addEventListener('click', () => {
    currentTab = 'pending';
    tabPending.classList.add('tab-active');
    tabProcessed.classList.remove('tab-active');
    processedOrdersContainer.classList.add('hidden');
    pendingOrdersContainer.classList.remove('hidden');
    renderOrders();
});

tabProcessed.addEventListener('click', () => {
    currentTab = 'processed';
    tabProcessed.classList.add('tab-active');
    tabPending.classList.remove('tab-active');
    pendingOrdersContainer.classList.add('hidden');
    processedOrdersContainer.classList.remove('hidden');
    renderOrders();
});
