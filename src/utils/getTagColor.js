const getTagColor = (type) => {
    switch (type) {
        case 'Hiring':
            return 'event hiring';
        case 'Information':
            return 'event info';
        case 'Premium':
            return 'event premium';
        default:
            return '';
    }
}

export default getTagColor;