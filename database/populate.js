async function populateData(db = {}) {
    try {
        await db.Dog.create({
            name: 'Neo',
            color: 'red & amber',
            tail_length: 22,
            weight: 32,
        });

        await db.Dog.create({
            name: 'Jessy',
            color: 'black & white',
            tail_length: 7,
            weight: 14,
        });

        await db.Dog.create({
            name: 'Max',
            color: 'Brown',
            tail_length: 12.5,
            weight: 25.3,
        });

        await db.Dog.create({
            name: 'Olaf',
            color: 'Red',
            tail_length: 23,
            weight: 11,
        });

        console.log('Data populated successfully.');
    } catch (error) {
        console.error('Failed to populate data:', error);
    }
}

module.exports = populateData;
