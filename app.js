class CurrencyConverter {
    constructor() {
        this.apiUrl = 'https://api.exchangerate-api.com/v4/latest/';
        this.initializeElements();
        this.attachEventListeners();
        this.loadMoreCurrencies();
    }

    initializeElements() {
        this.amountInput = document.getElementById('amount');
        this.fromCurrency = document.getElementById('fromCurrency');
        this.toCurrency = document.getElementById('toCurrency');
        this.convertBtn = document.getElementById('convertBtn');
        this.swapBtn = document.getElementById('swapBtn');
        this.result = document.getElementById('result');
        this.loading = document.getElementById('loading');
    }

    attachEventListeners() {
        this.convertBtn.addEventListener('click', () => this.convertCurrency());
        this.swapBtn.addEventListener('click', () => this.swapCurrencies());
        
        // Convert on Enter key press
        this.amountInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.convertCurrency();
            }
        });

        // Auto-convert when currency selection changes
        this.fromCurrency.addEventListener('change', () => this.convertCurrency());
        this.toCurrency.addEventListener('change', () => this.convertCurrency());
    }

    async loadMoreCurrencies() {
        try {
            const response = await fetch(`${this.apiUrl}USD`);
            const data = await response.json();
            
            const currencies = Object.keys(data.rates);
            const currencyNames = {
                'AED': 'AED - UAE Dirham',
                'AFN': 'AFN - Afghan Afghani',
                'ALL': 'ALL - Albanian Lek',
                'AMD': 'AMD - Armenian Dram',
                'ANG': 'ANG - Netherlands Antillean Guilder',
                'AOA': 'AOA - Angolan Kwanza',
                'ARS': 'ARS - Argentine Peso',
                'AUD': 'AUD - Australian Dollar',
                'AWG': 'AWG - Aruban Florin',
                'AZN': 'AZN - Azerbaijani Manat',
                'BAM': 'BAM - Bosnia-Herzegovina Convertible Mark',
                'BBD': 'BBD - Barbadian Dollar',
                'BDT': 'BDT - Bangladeshi Taka',
                'BGN': 'BGN - Bulgarian Lev',
                'BHD': 'BHD - Bahraini Dinar',
                'BIF': 'BIF - Burundian Franc',
                'BMD': 'BMD - Bermudan Dollar',
                'BND': 'BND - Brunei Dollar',
                'BOB': 'BOB - Bolivian Boliviano',
                'BRL': 'BRL - Brazilian Real',
                'BSD': 'BSD - Bahamian Dollar',
                'BTC': 'BTC - Bitcoin',
                'BTN': 'BTN - Bhutanese Ngultrum',
                'BWP': 'BWP - Botswanan Pula',
                'BYN': 'BYN - Belarusian Ruble',
                'BZD': 'BZD - Belize Dollar',
                'CAD': 'CAD - Canadian Dollar',
                'CDF': 'CDF - Congolese Franc',
                'CHF': 'CHF - Swiss Franc',
                'CLP': 'CLP - Chilean Peso',
                'CNY': 'CNY - Chinese Yuan',
                'COP': 'COP - Colombian Peso',
                'CRC': 'CRC - Costa Rican Colón',
                'CUC': 'CUC - Cuban Convertible Peso',
                'CUP': 'CUP - Cuban Peso',
                'CVE': 'CVE - Cape Verdean Escudo',
                'CZK': 'CZK - Czech Republic Koruna',
                'DJF': 'DJF - Djiboutian Franc',
                'DKK': 'DKK - Danish Krone',
                'DOP': 'DOP - Dominican Peso',
                'DZD': 'DZD - Algerian Dinar',
                'EGP': 'EGP - Egyptian Pound',
                'ERN': 'ERN - Eritrean Nakfa',
                'ETB': 'ETB - Ethiopian Birr',
                'EUR': 'EUR - Euro',
                'FJD': 'FJD - Fijian Dollar',
                'FKP': 'FKP - Falkland Islands Pound',
                'GBP': 'GBP - British Pound Sterling',
                'GEL': 'GEL - Georgian Lari',
                'GGP': 'GGP - Guernsey Pound',
                'GHS': 'GHS - Ghanaian Cedi',
                'GIP': 'GIP - Gibraltar Pound',
                'GMD': 'GMD - Gambian Dalasi',
                'GNF': 'GNF - Guinean Franc',
                'GTQ': 'GTQ - Guatemalan Quetzal',
                'GYD': 'GYD - Guyanaese Dollar',
                'HKD': 'HKD - Hong Kong Dollar',
                'HNL': 'HNL - Honduran Lempira',
                'HRK': 'HRK - Croatian Kuna',
                'HTG': 'HTG - Haitian Gourde',
                'HUF': 'HUF - Hungarian Forint',
                'IDR': 'IDR - Indonesian Rupiah',
                'ILS': 'ILS - Israeli New Sheqel',
                'IMP': 'IMP - Manx pound',
                'INR': 'INR - Indian Rupee',
                'IQD': 'IQD - Iraqi Dinar',
                'IRR': 'IRR - Iranian Rial',
                'ISK': 'ISK - Icelandic Króna',
                'JEP': 'JEP - Jersey Pound',
                'JMD': 'JMD - Jamaican Dollar',
                'JOD': 'JOD - Jordanian Dinar',
                'JPY': 'JPY - Japanese Yen',
                'KES': 'KES - Kenyan Shilling',
                'KGS': 'KGS - Kyrgystani Som',
                'KHR': 'KHR - Cambodian Riel',
                'KMF': 'KMF - Comorian Franc',
                'KPW': 'KPW - North Korean Won',
                'KRW': 'KRW - South Korean Won',
                'KWD': 'KWD - Kuwaiti Dinar',
                'KYD': 'KYD - Cayman Islands Dollar',
                'KZT': 'KZT - Kazakhstani Tenge',
                'LAK': 'LAK - Laotian Kip',
                'LBP': 'LBP - Lebanese Pound',
                'LKR': 'LKR - Sri Lankan Rupee',
                'LRD': 'LRD - Liberian Dollar',
                'LSL': 'LSL - Lesotho Loti',
                'LYD': 'LYD - Libyan Dinar',
                'MAD': 'MAD - Moroccan Dirham',
                'MDL': 'MDL - Moldovan Leu',
                'MGA': 'MGA - Malagasy Ariary',
                'MKD': 'MKD - Macedonian Denar',
                'MMK': 'MMK - Myanma Kyat',
                'MNT': 'MNT - Mongolian Tugrik',
                'MOP': 'MOP - Macanese Pataca',
                'MRO': 'MRO - Mauritanian Ouguiya (pre-2018)',
                'MRU': 'MRU - Mauritanian Ouguiya',
                'MUR': 'MUR - Mauritian Rupee',
                'MVR': 'MVR - Maldivian Rufiyaa',
                'MWK': 'MWK - Malawian Kwacha',
                'MXN': 'MXN - Mexican Peso',
                'MYR': 'MYR - Malaysian Ringgit',
                'MZN': 'MZN - Mozambican Metical',
                'NAD': 'NAD - Namibian Dollar',
                'NGN': 'NGN - Nigerian Naira',
                'NIO': 'NIO - Nicaraguan Córdoba',
                'NOK': 'NOK - Norwegian Krone',
                'NPR': 'NPR - Nepalese Rupee',
                'NZD': 'NZD - New Zealand Dollar',
                'OMR': 'OMR - Omani Rial',
                'PAB': 'PAB - Panamanian Balboa',
                'PEN': 'PEN - Peruvian Nuevo Sol',
                'PGK': 'PGK - Papua New Guinean Kina',
                'PHP': 'PHP - Philippine Peso',
                'PKR': 'PKR - Pakistani Rupee',
                'PLN': 'PLN - Polish Zloty',
                'PYG': 'PYG - Paraguayan Guarani',
                'QAR': 'QAR - Qatari Rial',
                'RON': 'RON - Romanian Leu',
                'RSD': 'RSD - Serbian Dinar',
                'RUB': 'RUB - Russian Ruble',
                'RWF': 'RWF - Rwandan Franc',
                'SAR': 'SAR - Saudi Riyal',
                'SBD': 'SBD - Solomon Islands Dollar',
                'SCR': 'SCR - Seychellois Rupee',
                'SDG': 'SDG - Sudanese Pound',
                'SEK': 'SEK - Swedish Krona',
                'SGD': 'SGD - Singapore Dollar',
                'SHP': 'SHP - Saint Helena Pound',
                'SLE': 'SLE - Sierra Leonean Leone',
                'SLL': 'SLL - Sierra Leonean Leone (pre-2022)',
                'SOS': 'SOS - Somali Shilling',
                'SRD': 'SRD - Surinamese Dollar',
                'STD': 'STD - São Tomé and Príncipe Dobra (pre-2018)',
                'STN': 'STN - São Tomé and Príncipe Dobra',
                'SVC': 'SVC - Salvadoran Colón',
                'SYP': 'SYP - Syrian Pound',
                'SZL': 'SZL - Swazi Lilangeni',
                'THB': 'THB - Thai Baht',
                'TJS': 'TJS - Tajikistani Somoni',
                'TMT': 'TMT - Turkmenistani Manat',
                'TND': 'TND - Tunisian Dinar',
                'TOP': 'TOP - Tongan Paʻanga',
                'TRY': 'TRY - Turkish Lira',
                'TTD': 'TTD - Trinidad and Tobago Dollar',
                'TVD': 'TVD - Tuvaluan Dollar',
                'TWD': 'TWD - New Taiwan Dollar',
                'TZS': 'TZS - Tanzanian Shilling',
                'UAH': 'UAH - Ukrainian Hryvnia',
                'UGX': 'UGX - Ugandan Shilling',
                'USD': 'USD - US Dollar',
                'UYU': 'UYU - Uruguayan Peso',
                'UZS': 'UZS - Uzbekistan Som',
                'VED': 'VED - Venezuelan Bolívar Soberano',
                'VES': 'VES - Venezuelan Bolívar Soberano',
                'VND': 'VND - Vietnamese Dong',
                'VUV': 'VUV - Vanuatu Vatu',
                'WST': 'WST - Samoan Tala',
                'XAF': 'XAF - CFA Franc BEAC',
                'XAG': 'XAG - Silver Ounce',
                'XAU': 'XAU - Gold Ounce',
                'XCD': 'XCD - East Caribbean Dollar',
                'XDR': 'XDR - Special Drawing Rights',
                'XOF': 'XOF - CFA Franc BCEAO',
                'XPD': 'XPD - Palladium Ounce',
                'XPF': 'XPF - CFP Franc',
                'XPT': 'XPT - Platinum Ounce',
                'YER': 'YER - Yemeni Rial',
                'ZAR': 'ZAR - South African Rand',
                'ZMW': 'ZMW - Zambian Kwacha',
                'ZWL': 'ZWL - Zimbabwean Dollar'
            };

            // Clear existing options except the default ones
            this.fromCurrency.innerHTML = '';
            this.toCurrency.innerHTML = '';

            // Add all available currencies
            currencies.sort().forEach(currency => {
                const displayName = currencyNames[currency] || `${currency} - ${currency}`;
                
                const fromOption = new Option(displayName, currency);
                const toOption = new Option(displayName, currency);
                
                this.fromCurrency.add(fromOption);
                this.toCurrency.add(toOption);
            });

            // Set default selections
            this.fromCurrency.value = 'USD';
            this.toCurrency.value = 'EUR';

        } catch (error) {
            console.error('Error loading currencies:', error);
        }
    }

    async convertCurrency() {
        const amount = parseFloat(this.amountInput.value);
        const from = this.fromCurrency.value;
        const to = this.toCurrency.value;

        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (from === to) {
            this.displayResult(amount, amount, from, to, 1);
            return;
        }

        this.showLoading(true);

        try {
            const response = await fetch(`${this.apiUrl}${from}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }

            const data = await response.json();
            const rate = data.rates[to];

            if (!rate) {
                throw new Error('Currency not supported');
            }

            const convertedAmount = amount * rate;
            this.displayResult(amount, convertedAmount, from, to, rate);

        } catch (error) {
            console.error('Conversion error:', error);
            alert('Error converting currency. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    displayResult(originalAmount, convertedAmount, fromCurrency, toCurrency, rate) {
        const resultAmount = this.result.querySelector('.result-amount');
        const exchangeRate = this.result.querySelector('.exchange-rate');

        resultAmount.textContent = `${convertedAmount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} ${toCurrency}`;

        exchangeRate.textContent = `1 ${fromCurrency} = ${rate.toLocaleString('en-US', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        })} ${toCurrency}`;

        this.result.classList.add('show');
    }

    swapCurrencies() {
        const fromValue = this.fromCurrency.value;
        const toValue = this.toCurrency.value;

        this.fromCurrency.value = toValue;
        this.toCurrency.value = fromValue;

        // Auto-convert after swap
        if (this.amountInput.value) {
            this.convertCurrency();
        }
    }

    showLoading(show) {
        if (show) {
            this.loading.classList.add('show');
            this.result.classList.remove('show');
        } else {
            this.loading.classList.remove('show');
        }
    }
}

// Initialize the currency converter when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CurrencyConverter();
});
