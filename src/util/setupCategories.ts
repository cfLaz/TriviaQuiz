interface CategoryFetched {
    id: number,
    name: string,
}

interface Categories {
    [key: string]: number | Array<number>
}

export function setupCategories(categories: Array<CategoryFetched>): Categories {
    const categoryIds: Categories = {};

    categories.forEach(cat => {
        const categoryNameSplitted = cat.name.split(': ');

        if (categoryNameSplitted.length < 2) {
            categoryIds[cat.name] = cat.id;
        }
        else {
            const catName = categoryNameSplitted[0];
            categoryIds[catName] ? (categoryIds[catName] as number[]).push(cat.id) : categoryIds[catName] = [cat.id];
        }

    });
    return categoryIds
}