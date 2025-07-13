let settings = { price: 0, cost: 0 }, records = [], data = {}, isMobile = false;
let db;

// Language support with Tamil added
const translations = {
    en: {
        appTitle: "Cattle Management",
        appSubtitle: "Data Input & Visual Reports",
        dataManagementTitle: "Data Management",
        lastSavedLabel: "Last:",
        recordsLabel: "Records:",
        backupButton: "Backup",
        clearButton: "Clear",
        settingsTitle: "Settings",
        milkPriceLabel: "Milk Price (₹/L):",
        feedCostLabel: "Weekly Feed Cost (₹):",
        priceError: "Please enter a valid price",
        costError: "Please enter a valid cost",
        saveSettingsButton: "Save Settings",
        dailyProductionTitle: "Daily Production",
        dateLabel: "Date:",
        morningLabel: "Morning (L):",
        eveningLabel: "Evening (L):",
        healthLabel: "Health Notes:",
        voiceButton: "Voice Input",
        addRecordButton: "Add Record",
        reportButton: "Report",
        multiReportButton: "Multi-Report",
        dateError: "Please select a date",
        morningError: "Please enter a valid quantity",
        eveningError: "Please enter a valid quantity",
        reportTitle: "Report",
        totalMilkLabel: "Total Milk (L)",
        totalRevenueLabel: "Revenue",
        totalCostLabel: "Cost",
        netProfitLabel: "Net Profit",
        dailyChartTitle: "Daily Chart",
        dataTableTitle: "Data Table",
        dateColumn: "Date",
        morningColumn: "Morning",
        eveningColumn: "Evening",
        totalColumn: "Total",
        revenueColumn: "Revenue",
        healthColumn: "Health",
        downloadCSVButton: "CSV",
        downloadPDFButton: "PDF",
        multiPeriodTitle: "Multi-Period",
        periodLabel: "Period:",
        weeklyOption: "Weekly",
        monthlyOption: "Monthly",
        quarterlyOption: "Quarterly",
        periodChartTitle: "Period Chart",
        periodDataTitle: "Period Data",
        periodColumn: "Period",
        milkColumn: "Milk",
        revenueColumn2: "Revenue",
        costColumn: "Cost",
        profitColumn: "Profit",
        downloadMultiCSVButton: "CSV",
        downloadMultiPDFButton: "PDF",
        periodsLabel: "Periods",
        avgPeriodLabel: "Avg/Period",
        totalProfitLabel: "Total Profit",
        onlineStatus: "Online",
        offlineStatus: "Offline"
    },
    hi: {
        appTitle: "पशु प्रबंधन",
        appSubtitle: "डेटा इनपुट और दृश्य रिपोर्ट",
        dataManagementTitle: "डेटा प्रबंधन",
        lastSavedLabel: "अंतिम:",
        recordsLabel: "रिकॉर्ड्स:",
        backupButton: "बैकअप",
        clearButton: "हटाएँ",
        settingsTitle: "सेटिंग्स",
        milkPriceLabel: "दूध की कीमत (₹/लीटर):",
        feedCostLabel: "साप्ताहिक चारा लागत (₹):",
        priceError: "कृपया एक मान्य कीमत दर्ज करें",
        costError: "कृपया एक मान्य लागत दर्ज करें",
        saveSettingsButton: "सेटिंग्स सहेजें",
        dailyProductionTitle: "दैनिक उत्पादन",
        dateLabel: "तारीख:",
        morningLabel: "सुबह (लीटर):",
        eveningLabel: "शाम (लीटर):",
        healthLabel: "स्वास्थ्य नोट्स:",
        voiceButton: "वॉइस इनपुट",
        addRecordButton: "रिकॉर्ड जोड़ें",
        reportButton: "रिपोर्ट",
        multiReportButton: "मल्टी-रिपोर्ट",
        dateError: "कृपया एक तारीख चुनें",
        morningError: "कृपया एक मान्य मात्रा दर्ज करें",
        eveningError: "कृपया एक मान्य मात्रा दर्ज करें",
        reportTitle: "रिपोर्ट",
        totalMilkLabel: "कुल दूध (लीटर)",
        totalRevenueLabel: "आय",
        totalCostLabel: "लागत",
        netProfitLabel: "शुद्ध लाभ",
        dailyChartTitle: "दैनिक चार्ट",
        dataTableTitle: "डेटा तालिका",
        dateColumn: "तारीख",
        morningColumn: "सुबह",
        eveningColumn: "शाम",
        totalColumn: "कुल",
        revenueColumn: "आय",
        healthColumn: "स्वास्थ्य",
        downloadCSVButton: "सीएसवी",
        downloadPDFButton: "पीडीएफ",
        multiPeriodTitle: "मल्टी-पीरियड",
        periodLabel: "अवधि:",
        weeklyOption: "साप्ताहिक",
        monthlyOption: "मासिक",
        quarterlyOption: "तिमाही",
        periodChartTitle: "अवधि चार्ट",
        periodDataTitle: "अवधि डेटा",
        periodColumn: "अवधि",
        milkColumn: "दूध",
        revenueColumn2: "आय",
        costColumn: "लागत",
        profitColumn: "लाभ",
        downloadMultiCSVButton: "सीएसवी",
        downloadMultiPDFButton: "पीडीएफ",
        periodsLabel: "अवधियाँ",
        avgPeriodLabel: "औसत/अवधि",
        totalProfitLabel: "कुल लाभ",
        onlineStatus: "ऑनलाइन",
        offlineStatus: "ऑफ़लाइन"
    },
    ta: {
        appTitle: "கால்நடை மேலாண்மை",
        appSubtitle: "தரவு உள்ளீடு மற்றும் காட்சி அறிக்கைகள்",
        dataManagementTitle: "தரவு மேலாண்மை",
        lastSavedLabel: "கடைசி:",
        recordsLabel: "பதிவுகள்:",
        backupButton: "காப்பு",
        clearButton: "நீக்கு",
        settingsTitle: "அமைப்புகள்",
        milkPriceLabel: "பால் விலை (₹/லி):",
        feedCostLabel: "வாராந்திர தீவன செலவு (₹):",
        priceError: "தயவுசெய்து செல்லுபடியாகும் விலையை உள்ளிடவும்",
        costError: "தயவுசெய்து செல்லுபடியாகும் செலவை உள்ளிடவும்",
        saveSettingsButton: "அமைப்புகளை சேமி",
        dailyProductionTitle: "தினசரி உற்பத்தி",
        dateLabel: "தேதி:",
        morningLabel: "காலை (லி):",
        eveningLabel: "மாலை (லி):",
        healthLabel: "ஆரோக்கிய குறிப்புகள்:",
        voiceButton: "குரல் உள்ளீடு",
        addRecordButton: "பதிவு சேர்",
        reportButton: "அறிக்கை",
        multiReportButton: "பல-அறிக்கை",
        dateError: "தயவுசெய்து ஒரு தேதியைத் தேர்ந்தெடுக்கவும்",
        morningError: "தயவுசெய்து செல்லுபடியாகும் அளவை உள்ளிடவும்",
        eveningError: "தயவுசெய்து செல்லுபடியாகும் அளவை உள்ளிடவும்",
        reportTitle: "அறிக்கை",
        totalMilkLabel: "மொத்த பால் (லி)",
        totalRevenueLabel: "வருவாய்",
        totalCostLabel: "செலவு",
        netProfitLabel: "நிகர லாபம்",
        dailyChartTitle: "தினசரி விளக்கப்படம்",
        dataTableTitle: "தரவு அட்டவணை",
        dateColumn: "தேதி",
        morningColumn: "காலை",
        eveningColumn: "மாலை",
        totalColumn: "மொத்தம்",
        revenueColumn: "வருவாய்",
        healthColumn: "ஆரோக்கியம்",
        downloadCSVButton: "சி.எஸ்.வி",
        downloadPDFButton: "பி.டி.எஃப்",
        multiPeriodTitle: "பல-காலகட்டம்",
        periodLabel: "காலகட்டம்:",
        weeklyOption: "வாராந்திர",
        monthlyOption: "மாதாந்திர",
        quarterlyOption: "காலாண்டு",
        periodChartTitle: "காலகட்ட விளக்கப்படம்",
        periodDataTitle: "காலகட்ட தரவு",
        periodColumn: "காலகட்டம்",
        milkColumn: "பால்",
        revenueColumn2: "வருவாய்",
        costColumn: "செலவு",
        profitColumn: "லாபம்",
        downloadMultiCSVButton: "சி.எஸ்.வி",
        downloadMultiPDFButton: "பி.டி.எஃப்",
        periodsLabel: "காலகட்டங்கள்",
        avgPeriodLabel: "சராசரி/காலகட்டம்",
        totalProfitLabel: "மொத்த லாபம்",
        onlineStatus: "ஆன்லைன்",
        offlineStatus: "ஆஃப்லைன்"
    }
};

// Initialize IndexedDB
function initDB() {
    const request = indexedDB.open('CattleDB', 1);
    request.onupgradeneeded = event => {
        db = event.target.result;
        db.createObjectStore('records', { keyPath: 'date' });
        db.createObjectStore('settings', { keyPath: 'id' });
        db.createObjectStore('syncQueue', { autoIncrement: true });
    };
    request.onsuccess = event => {
        db = event.target.result;
    };
    request.onerror = () => alert('Database error', 'error');
}

document.addEventListener('DOMContentLoaded', () => {
    initDB();
    document.getElementById('date').value = new Date().toISOString().split('T')[0];
    load();
    updateStatus();
    setInterval(updateStatus, 30000);
    setupInputValidation();
    updateOfflineStatus();
    window.addEventListener('online', updateOfflineStatus);
    window.addEventListener('offline', updateOfflineStatus);
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }
});

function toggleTheme() {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.querySelector('.theme-toggle').textContent = document.body.dataset.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', document.body.dataset.theme);
}

function toggleView() {
    isMobile = !isMobile;
    const container = document.getElementById('container');
    container.classList.toggle('mobile', isMobile);
    document.querySelector('.toggle').textContent = isMobile ? '💻 Desktop' : '📱 Mobile';
}

function updateOfflineStatus() {
    const status = document.getElementById('offlineStatus');
    const lang = document.getElementById('language').value;
    if (navigator.onLine) {
        status.textContent = translations[lang].onlineStatus || 'Online';
        status.className = 'offline-status online';
        syncOfflineData();
    } else {
        status.textContent = translations[lang].offlineStatus || 'Offline';
        status.className = 'offline-status offline';
    }
}

function showLoader(show) {
    document.getElementById('loader').style.display = show ? 'flex' : 'none';
}

function setupInputValidation() {
    const inputs = ['price', 'cost', 'date', 'morning', 'evening', 'health'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', () => {
            const error = document.getElementById(`${id}-error`);
            if (id === 'date' && !input.value) {
                input.classList.add('invalid');
                error.style.display = 'block';
            } else if (['price', 'cost', 'morning', 'evening'].includes(id) && (input.value < 0 || isNaN(input.value) && input.value !== '')) {
                input.classList.add('invalid');
                error.style.display = 'block';
            } else {
                input.classList.remove('invalid');
                error.style.display = 'none';
            }
        });
    });
}

function changeLanguage() {
    const lang = document.getElementById('language').value;
    Object.keys(translations[lang]).forEach(key => {
        const element = document.getElementById(key);
        if (element) element.textContent = translations[lang][key];
    });
    updateOfflineStatus(); // Update offline status text based on language
}

function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Voice input not supported in this browser', 'error');
        return;
    }
    const recognition = new webkitSpeechRecognition();
    const lang = document.getElementById('language').value;
    recognition.lang = lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.start();
    recognition.onresult = event => {
        const transcript = event.results[0][0].transcript;
        const words = transcript.toLowerCase().split(' ');
        const morning = parseFloat(words.find(w => !isNaN(parseFloat(w))) || 0);
        const evening = parseFloat(words.slice(-1)[0]) || 0;
        document.getElementById('morning').value = morning || '';
        document.getElementById('evening').value = evening || '';
        alert('Voice input recorded', 'success');
    };
    recognition.onerror = () => alert('Voice input failed', 'error');
}

function store() {
    try {
        data = { settings, records, timestamp: new Date().toISOString(), version: '1.0' };
        const tx = db.transaction(['records', 'settings', 'syncQueue'], 'readwrite');
        const recordStore = tx.objectStore('records');
        const settingsStore = tx.objectStore('settings');
        const syncQueue = tx.objectStore('syncQueue');
        records.forEach(record => {
            recordStore.put(record);
            if (!navigator.onLine) syncQueue.add({ type: 'record', data: record });
        });
        settingsStore.put({ id: 'settings', ...settings });
        if (!navigator.onLine) syncQueue.add({ type: 'settings', data: settings });
        localStorage.setItem('cattleData', JSON.stringify(data));
        updateStatus();
        return true;
    } catch (e) {
        alert('Error saving data', 'error');
        return false;
    }
}

function load() {
    showLoader(true);
    try {
        const tx = db.transaction(['records', 'settings'], 'readonly');
        const recordStore = tx.objectStore('records');
        const settingsStore = tx.objectStore('settings');
        recordStore.getAll().onsuccess = event => {
            records = event.target.result || [];
            document.getElementById('rc').textContent = records.length;
        };
        settingsStore.get('settings').onsuccess = event => {
            settings = event.target.result || { price: 0, cost: 0 };
            document.getElementById('price').value = settings.price || '';
            document.getElementById('cost').value = settings.cost || '';
        };
        const saved = localStorage.getItem('cattleData');
        if (saved) {
            data = JSON.parse(saved);
            settings = data.settings || { price: 0, cost: 0 };
            records = data.records || [];
            document.getElementById('price').value = settings.price || '';
            document.getElementById('cost').value = settings.cost || '';
            alert('Data loaded successfully!', 'success');
        } else {
            alert('Welcome! Set prices first.', 'info');
        }
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.dataset.theme = savedTheme;
            document.querySelector('.theme-toggle').textContent = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
        updateStatus();
    } catch (e) {
        alert('Error loading data. Starting fresh.', 'warning');
    } finally {
        showLoader(false);
    }
}

function syncOfflineData() {
    if (!navigator.onLine) return;
    const tx = db.transaction(['syncQueue'], 'readwrite');
    const syncQueue = tx.objectStore('syncQueue');
    syncQueue.getAll().onsuccess = event => {
        const queue = event.target.result;
        queue.forEach(item => {
            // Placeholder for server sync logic
            console.log(`Syncing ${item.type}:`, item.data);
            // Example: fetch('/api/sync', { method: 'POST', body: JSON.stringify(item.data) });
        });
        syncQueue.clear();
    };
}

function backup() {
    showLoader(true);
    try {
        const b = { settings, records, timestamp: new Date().toISOString(), version: '1.0' };
        const blob = new Blob([JSON.stringify(b, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cattle-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        alert('Backup created successfully!', 'success');
    } catch (e) {
        alert('Backup failed', 'error');
    } finally {
        showLoader(false);
    }
}

function restore(input) {
    const file = input.files[0];
    if (!file) return;
    showLoader(true);
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const b = JSON.parse(e.target.result);
            if (!b.settings || !b.records) throw new Error('Invalid file');
            if (records.length > 0 && !confirm(`Replace ${records.length} existing records?`)) return;
            settings = b.settings;
            records = b.records;
            document.getElementById('price').value = settings.price || '';
            document.getElementById('cost').value = settings.cost || '';
            store();
            alert(`Restored ${records.length} records successfully!`, 'success');
        } catch (err) {
            alert('Invalid backup file', 'error');
        } finally {
            showLoader(false);
            input.value = '';
        }
    };
    reader.readAsText(file);
}

function clear() {
    if (!confirm(`Delete all ${records.length} records? This cannot be undone.`)) return;
    showLoader(true);
    const tx = db.transaction(['records', 'settings', 'syncQueue'], 'readwrite');
    tx.objectStore('records').clear();
    tx.objectStore('settings').clear();
    tx.objectStore('syncQueue').clear();
    settings = { price: 0, cost: 0 };
    records = [];
    document.getElementById('price').value = '';
    document.getElementById('cost').value = '';
    document.getElementById('morning').value = '';
    document.getElementById('evening').value = '';
    document.getElementById('health').value = '';
    document.getElementById('report').style.display = 'none';
    document.getElementById('multi').style.display = 'none';
    localStorage.removeItem('cattleData');
    alert('All data cleared successfully!', 'success');
    showLoader(false);
}

function updateStatus() {
    const ls = document.getElementById('ls');
    if (data.timestamp) {
        const diff = Math.floor((new Date() - new Date(data.timestamp)) / (1000 * 60));
        ls.textContent = diff < 1 ? 'Now' : diff < 60 ? `${diff}m` : `${Math.floor(diff / 60)}h`;
    } else {
        ls.textContent = 'Never';
    }
    document.getElementById('rc').textContent = records.length;
}

function saveSettings() {
    const price = parseFloat(document.getElementById('price').value);
    const cost = parseFloat(document.getElementById('cost').value);
    if (!price || !cost || price < 0 || cost < 0) {
        alert('Please enter valid price and cost values', 'error');
        return;
    }
    settings = { price, cost };
    store();
    alert('Settings saved successfully!', 'success');
}

function addRecord() {
    const date = document.getElementById('date').value;
    const morning = parseFloat(document.getElementById('morning').value) || 0;
    const evening = parseFloat(document.getElementById('evening').value) || 0;
    const health = document.getElementById('health').value || 'Healthy';
    if (!date || (morning + evening) === 0) {
        alert('Please enter a valid date and at least one milk quantity', 'error');
        return;
    }
    if (morning < 0 || evening < 0) {
        alert('Milk quantities cannot be negative', 'error');
        return;
    }
    const total = morning + evening;
    const revenue = total * settings.price;
    const index = records.findIndex(r => r.date === date);
    const record = { date, morning, evening, total, revenue, health };
    if (index !== -1) {
        records[index] = record;
    } else {
        records.push(record);
    }
    records.sort((a, b) => new Date(a.date) - new Date(b.date));
    store();
    alert('Record added successfully!', 'success');
    document.getElementById('morning').value = '';
    document.getElementById('evening').value = '';
    document.getElementById('health').value = '';
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    document.getElementById('date').value = next.toISOString().split('T')[0];
}

function generateReport() {
    if (!records.length) {
        alert('No records found', 'error');
        return;
    }
    if (!settings.price) {
        alert('Please set milk price first', 'error');
        return;
    }
    showLoader(true);
    const totalMilk = records.reduce((s, r) => s + r.total, 0);
    const totalRevenue = records.reduce((s, r) => s + r.revenue, 0);
    const totalCost = Math.ceil(records.length / 7) * settings.cost;
    const netProfit = totalRevenue - totalCost;

    document.getElementById('totalMilk').textContent = totalMilk.toFixed(1);
    document.getElementById('totalRevenue').textContent = `₹${totalRevenue.toFixed(2)}`;
    document.getElementById('totalCost').textContent = `₹${totalCost.toFixed(2)}`;
    document.getElementById('netProfit').textContent = `₹${netProfit.toFixed(2)}`;
    document.getElementById('netProfit').className = `mv ${netProfit >= 0 ? 'profit' : 'loss'}`;

    drawChart('chart', records);
    populateTable(records);
    document.getElementById('report').style.display = 'block';
    alert(`${netProfit >= 0 ? 'Profit' : 'Loss'}: ₹${Math.abs(netProfit).toFixed(2)}`, 'success');
    showLoader(false);
}

function drawChart(id, data) {
    const chart = document.getElementById(id);
    chart.innerHTML = '';
    if (!data.length) return;
    const max = Math.max(...data.map(r => r.total || r.milk));
    data.forEach(record => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${((record.total || record.milk) / max) * 130}px`;
        bar.style.flex = '1';

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = `Date: ${record.date || record.period}\nMilk: ${(record.total || record.milk).toFixed(1)}L${record.revenue ? `\nRevenue: ₹${record.revenue.toFixed(2)}` : ''}${record.health ? `\nHealth: ${record.health}` : ''}`;
        
        const label = document.createElement('div');
        label.className = 'bl';
        label.textContent = record.date ? new Date(record.date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit' }) : record.period;

        const value = document.createElement('div');
        value.className = 'bv';
        value.textContent = `${(record.total || record.milk).toFixed(1)}L`;

        bar.appendChild(tooltip);
        bar.appendChild(label);
        bar.appendChild(value);
        chart.appendChild(bar);

        bar.addEventListener('mouseenter', () => tooltip.style.display = 'block');
        bar.addEventListener('mouseleave', () => tooltip.style.display = 'none');
    });
}

function populateTable(data) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    data.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(record.date).toLocaleDateString('en-IN')}</td>
            <td>${record.morning.toFixed(1)}</td>
            <td>${record.evening.toFixed(1)}</td>
            <td>${record.total.toFixed(1)}</td>
            <td>₹${record.revenue.toFixed(2)}</td>
            <td>${record.health}</td>
        `;
        tbody.appendChild(row);
    });
}

function filterTable() {
    const search = document.getElementById('search').value.toLowerCase();
    const filtered = records.filter(r => new Date(r.date).toLocaleDateString('en-IN').toLowerCase().includes(search) || r.health.toLowerCase().includes(search));
    populateTable(filtered);
}

function download() {
    if (!records.length) {
        alert('No data to download', 'error');
        return;
    }
    const totalMilk = records.reduce((s, r) => s + r.total, 0);
    const totalRevenue = records.reduce((s, r) => s + r.revenue, 0);
    const totalCost = Math.ceil(records.length / 7) * settings.cost;
    const netProfit = totalRevenue - totalCost;

    let csv = "Cattle Report\n\nSUMMARY\n";
    csv += `Milk,${totalMilk.toFixed(1)}L\n`;
    csv += `Revenue,₹${totalRevenue.toFixed(2)}\n`;
    csv += `Cost,₹${totalCost.toFixed(2)}\n`;
    csv += `${netProfit >= 0 ? 'Profit' : 'Loss'},₹${Math.abs(netProfit).toFixed(2)}\n\n`;
    csv += "RECORDS\nDate,Morning,Evening,Total,Revenue,Health\n";
    records.forEach(r => {
        csv += `${r.date},${r.morning},${r.evening},${r.total},${r.revenue.toFixed(2)},${r.health}\n`;
    });

    downloadFile(csv, `cattle-report-${new Date().toISOString().split('T')[0]}.csv`);
}

function downloadPDF() {
    showLoader(true);
    const element = document.getElementById('report');
    html2pdf()
        .from(element)
        .set({
            margin: 10,
            filename: `cattle-report-${new Date().toISOString().split('T')[0]}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        })
        .save()
        .then(() => {
            alert('PDF downloaded successfully!', 'success');
            showLoader(false);
        })
        .catch(() => {
            alert('PDF generation failed', 'error');
            showLoader(false);
        });
}

function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    alert('Downloaded successfully!', 'success');
}

function alert(msg, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `a a${type[0]}`;
    alertDiv.textContent = translations[document.getElementById('language').value][msg] || msg;
    document.getElementById('alerts').appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
}

function multiReport() {
    if (!records.length) {
        alert('No records found', 'error');
        return;
    }
    document.getElementById('multi').style.display = 'block';
    updateMulti();
}

function updateMulti() {
    const period = document.getElementById('period').value;
    const periods = groupByPeriod(records, period);
    displayMultiMetrics(periods);
    drawChart('multiChart', Object.keys(periods).sort().map(k => ({ period: k, milk: periods[k].milk })));
    displayMultiTable(periods);
}

function groupByPeriod(records, period) {
    const groups = {};
    records.forEach(r => {
        const date = new Date(r.date);
        let key;
        if (period === 'weekly') {
            const week = Math.ceil((date - new Date(date.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
            key = `${date.getFullYear()}-W${week}`;
        } else if (period === 'monthly') {
            key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        } else {
            key = `${date.getFullYear()}-Q${Math.floor(date.getMonth() / 3) + 1}`;
        }
        if (!groups[key]) groups[key] = { milk: 0, revenue: 0, cost: 0, profit: 0 };
        groups[key].milk += r.total;
        groups[key].revenue += r.revenue;
    });

    Object.keys(groups).forEach(key => {
        const g = groups[key];
        g.cost = period === 'weekly' ? settings.cost : period === 'monthly' ? settings.cost * 4.33 : settings.cost * 13;
        g.profit = g.revenue - g.cost;
    });
    return groups;
}

function displayMultiMetrics(periods) {
    const keys = Object.keys(periods);
    const totalMilk = keys.reduce((s, k) => s + periods[k].milk, 0);
    const totalRevenue = keys.reduce((s, k) => s + periods[k].revenue, 0);
    const totalCost = keys.reduce((s, k) => s + periods[k].cost, 0);
    const totalProfit = totalRevenue - totalCost;

    document.getElementById('multiMetrics').innerHTML = `
        <div class="mc">
            <div class="mv">${keys.length}</div>
            <div class="ml"><span id="periodsLabel">${translations[document.getElementById('language').value].periodsLabel || 'Periods'}</span></div>
        </div>
        <div class="mc">
            <div class="mv">${totalMilk.toFixed(1)}</div>
            <div class="ml"><span id="totalMilkLabel">${translations[document.getElementById('language').value].totalMilkLabel}</span></div>
        </div>
        <div class="mc">
            <div class="mv">${(totalMilk / keys.length).toFixed(1)}</div>
            <div class="ml"><span id="avgPeriodLabel">${translations[document.getElementById('language').value].avgPeriodLabel || 'Avg/Period'}</span></div>
        </div>
        <div class="mc">
            <div class="mv ${totalProfit >= 0 ? 'profit' : 'loss'}">₹${totalProfit.toFixed(2)}</div>
            <div class="ml"><span id="totalProfitLabel">${translations[document.getElementById('language').value].totalProfitLabel || 'Total Profit'}</span></div>
        </div>
    `;
}

function displayMultiTable(periods) {
    const tbody = document.getElementById('multiBody');
    tbody.innerHTML = '';
    Object.keys(periods).sort().forEach(key => {
        const p = periods[key];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${key}</td>
            <td>${p.milk.toFixed(1)}</td>
            <td>₹${p.revenue.toFixed(2)}</td>
            <td>₹${p.cost.toFixed(2)}</td>
            <td class="${p.profit >= 0 ? 'profit' : 'loss'}">₹${p.profit.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

function downloadMulti() {
    if (!records.length) {
        alert('No data to download', 'error');
        return;
    }
    const period = document.getElementById('period').value;
    const periods = groupByPeriod(records, period);

    let csv = `Multi-Period Report (${period})\n\nPeriod,Milk,Revenue,Cost,Profit\n`;
    Object.keys(periods).sort().forEach(key => {
        const p = periods[key];
        csv += `${key},${p.milk.toFixed(1)},${p.revenue.toFixed(2)},${p.cost.toFixed(2)},${p.profit.toFixed(2)}\n`;
    });

    downloadFile(csv, `cattle-multi-${period}-${new Date().toISOString().split('T')[0]}.csv`);
}

function downloadMultiPDF() {
    showLoader(true);
    const element = document.getElementById('multi');
    html2pdf()
        .from(element)
        .set({
            margin: 10,
            filename: `cattle-multi-${document.getElementById('period').value}-${new Date().toISOString().split('T')[0]}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        })
        .save()
        .then(() => {
            alert('PDF downloaded successfully!', 'success');
            showLoader(false);
        })
        .catch(() => {
            alert('PDF generation failed', 'error');
            showLoader(false);
        });
}
