let itemsContainer = document.getElementById('item-container');
let formSub = document.getElementById('formSub');

formSub.addEventListener('submit', e => {
    e.preventDefault();
    let tags = ['name', 'quantity', 'price'];
    let item = {};
    tags.forEach(tag => {
        item[tag] = document.getElementById(tag).value;
        document.getElementById(tag).value = '';
    });
    addItem(`/add/${item.name}/${item.quantity}/${item.price}`);
});

function addItem(itemURL) {
    axios.post(itemURL).then(() => {
        renderItems();
    });
}

function renderItems() {
    axios.get('./list').then(res => {
        itemsContainer.innerHTML = listItems(res.data).join('');
    });
}

function delItem(item) {
    axios.delete(`/sub/${item}`).then(res => {
        renderItems();
    });
}

function listItems(items) {
    return items.map(item => {
        return `
            <tr class="text-center">
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price} each</td>
                <td><button class="btn-sml btn-warning rounded-circle" onClick="delItem('${item.name}')">X</button></td>
            </tr>
        `;
    });
}

renderItems();
