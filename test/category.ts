
const categories = [
    // {
    //     categoryName: 'Shop By Age',
    //     subCategories: [
    //         { categoryName: '0 to 1 Year Old' },
    //         { categoryName: '1 to 2 Years Old' },
    //         { categoryName: '2 to 4 Year Olds' },
    //         { categoryName: '4 to 6 Year Olds' },
    //         { categoryName: '6 to 8 Year Olds' },
    //         { categoryName: '8-10 Year Olds' },
    //         { categoryName: '10-15 Year Olds' }
    //     ]
    // },
    {
        categoryName: 'Shop By Type',
        subCategories: [
            {
                categoryName: 'Picture Story Books',
                subCategories: [
                    { categoryName: 'Boosts Imagination and Creativity' },
                    { categoryName: 'Overcoming Fears' },
                    { categoryName: 'Fairy Tales' },
                    { categoryName: 'Habit and Routine Development' },
                    { categoryName: 'Self Acceptance and Self Love' },
                    { categoryName: 'Fun' },
                    { categoryName: 'Morals and Values' },
                    { categoryName: 'Christmas Stories' },
                    { categoryName: 'Potty Training' },
                    { categoryName: 'Behaviour Books' },
                    { categoryName: 'Friendship' },
                    { categoryName: 'Emotions' },
                    { categoryName: 'Family Relations' },
                    { categoryName: 'Survival Skills' },
                    { categoryName: 'Comic Books' },
                    { categoryName: 'Mummy and Baby' },
                ]
            },
            { categoryName: 'Bedtime Story Books' },
            { categoryName: 'Touch and Feel Books' },
            { categoryName: 'Sound Books' },
            { categoryName: 'Flip Flap/Lift and Look Books' },
            { categoryName: '3D/Pop Up Books' },
            { categoryName: 'Rhyme Books' },
            { categoryName: 'Activity/Interactive Books' },
            { categoryName: 'Art/Drawing/Colouring Books' },
            { categoryName: 'Puzzle Books' },
            { categoryName: 'Phonics Books/Early Reading' },
            { categoryName: 'Sticker Books' },
            { categoryName: 'Search and Find Books' },
            { categoryName: 'Puppet Books' },
            { categoryName: 'Push Pull Slide' },
            { categoryName: 'Chapter Books' },
            { categoryName: 'Mega Sized Books' },
            { categoryName: 'Sing Along Books' }
        ]
    },
    {
        categoryName: 'Shop By Binding',
        subCategories: [
            { categoryName: 'Board Books' },
            { categoryName: 'Paperback Books' },
            { categoryName: 'Hardcover Books' }
        ]
    },
    {
        categoryName: 'Shop By Character',
        subCategories: [
            { categoryName: 'Disney Princess' },
            { categoryName: 'Winnie The Pooh' },
            { categoryName: 'Peppa Pig Book Series' },
            { categoryName: 'Baby Shark Series' },
            { categoryName: 'Paw Patrol' },
            { categoryName: 'Farmyard Tales' },
            { categoryName: 'Little Princess Series' },
            { categoryName: 'Harry Potter Books' },
            { categoryName: 'Batman' },
            { categoryName: 'Thomas and Friends' },
            { categoryName: 'Peter Rabbit' },
            { categoryName: 'Barbie' }
        ]
    },
    {
        categoryName: 'Shop By Price',
        subCategories: [
            { categoryName: 'Under 49/-' },
            { categoryName: 'Under 79/-' },
            { categoryName: 'Under 99/-' },
            { categoryName: 'Under 129/-' },
            { categoryName: 'Under 149/-' }
        ]
    },
    {
        categoryName: 'Shop By Publisher',
        subCategories: [
            { categoryName: 'Usborne' },
            { categoryName: 'Disney' },
            { categoryName: 'Igloo' }
        ]
    }
];

async function insertCategory(categoryName, parentId) {
    const response = await fetch('http://127.0.0.1:3000/admin/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName, parentId: parentId ?? null }),
    });

    if (response.ok) {
        const data = await response.json()
        console.log(data);

        return data.id
    } else {
        console.error(`Failed to insert category "${categoryName}".`);
        return null
    }

}

async function insertCategories(category) {
    const insertedId = await insertCategory(category.categoryName, category.parentId)
    if (category.subCategories) {
        category.subCategories = category.subCategories.map(c => ({ ...c, parentId: insertedId }))
    }
    if (category.subCategories) {
        await run(category.subCategories)
    } return
}

async function run(categorries) {
    for (const category of categorries) {

        await insertCategories(category)
    }
}

run(categories)
// insertCategories();
