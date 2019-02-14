import { TCurrency } from '../actions/quotation-actions'

interface ICurrency {
    label: string
    value: TCurrency
}

export const CURRENCIES: TCurrency[] = ['GBP', 'EUR', 'USD']

export const ALL_CURRENCIES: ICurrency[] = [
    {
        label: 'Australia Dollar',
        value: 'AUD'
    },
    {
        label: 'Bulgaria Lev',
        value: 'BGN'
    },
    {
        label: 'Brazil Real',
        value: 'BRL'
    },
    {
        label: 'Canada Dollar',
        value: 'CAD'
    },
    {
        label: 'Switzerland Franc',
        value: 'CHF'
    },
    {
        label: 'China Yuan Renminbi',
        value: 'CNY'
    },
    {
        label: 'Czech Republic Koruna',
        value: 'CZK'
    },
    {
        label: 'Denmark Krone',
        value: 'DKK'
    },
    {
        label: 'Euro Member Countries',
        value: 'EUR'
    },
    {
        label: 'United Kingdom Pound',
        value: 'GBP'
    },
    {
        label: 'Hong Kong Dollar',
        value: 'HKD'
    },
    {
        label: 'Croatia Kuna',
        value: 'HRK'
    },
    {
        label: 'Hungary Forint',
        value: 'HUF'
    },
    {
        label: 'Indonesia Rupiah',
        value: 'IDR'
    },
    {
        label: 'Israel Shekel',
        value: 'ILS'
    },
    {
        label: 'India Rupee',
        value: 'INR'
    },
    {
        label: 'Iceland Krona',
        value: 'ISK'
    },
    {
        label: 'Japan Yen',
        value: 'JPY'
    },
    {
        label: 'Korea (South) Won',
        value: 'KRW'
    },
    {
        label: 'Mexico Peso',
        value: 'MXN'
    },
    {
        label: 'Malaysia Ringgit',
        value: 'MYR'
    },
    {
        label: 'Norway Krone',
        value: 'NOK'
    },
    {
        label: 'New Zealand Dollar',
        value: 'NZD'
    },
    {
        label: 'Philippines Peso',
        value: 'PHP'
    },
    {
        label: 'Poland Zloty',
        value: 'PLN'
    },
    {
        label: 'Romania Leu',
        value: 'RON'
    },
    {
        label: 'Russia Ruble',
        value: 'RUB'
    },
    {
        label: 'Sweden Krona',
        value: 'SEK'
    },
    {
        label: 'Singapore Dollar',
        value: 'SGD'
    },
    {
        label: 'Thailand Baht',
        value: 'THB'
    },
    {
        label: 'Turkey Lira',
        value: 'TRY'
    },
    {
        label: 'United States Dollar',
        value: 'USD'
    },
    {
        label: 'South Africa Rand',
        value: 'ZAR'
    }
]
