const elements = {
    NAME: {
        elementType: 'input',
        config: {
            type: 'text',
            placeholder: 'Your Name'
        },
        validation: {
            required: true
        },
        value: '',
        label: 'Name'
    },
    EMAIL: {
        elementType: 'input',
        config: {
            type: 'email',
            placeholder: 'Your Email'
        },
        validation: {
            required: true
        },
        value: '',
        label: 'Email'
    },
    STREET: {
        elementType: 'input',
        config: {
            type: 'text',
            placeholder: 'Street'
        },
        validation: {
            required: true
        },
        value: '',
        label: 'Street'
    },
    CITY: {
        elementType: 'input',
        config: {
            type: 'text',
            placeholder: 'City'
        },
        validation: {
            required: true
        },
        value: '',
        label: 'City'
    },
    ZIP: {
        elementType: 'input',
        config: {
            type: 'text',
            placeholder: 'Zipcode'
        },
        validation: {
            required: true,
            minLength: 5,
            maxLength: 5
        },
        value: '',
        label: 'Zip Code'
    },
    DELIVERY_METHOD: {
        elementType: 'select',
        config: {
            options: [
                { value: 'regular', display: 'Regular' },
                { value: 'fastest', display: 'Fastest' }
            ],
            defaultValue: ''
        },
        value: '',
        label: 'Delivery Method'
    }
};

export default elements;
