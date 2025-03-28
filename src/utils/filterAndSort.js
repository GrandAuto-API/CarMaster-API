export const applyFiltersAndSorting = (query, filters, sort) => {
	
	if (filters) {
		Object.keys(filters).forEach((key) => {
			query = query.where(key).equals(filters[key]);
		});
	}

	if (sort) {
        const sortOptions = sort.split(',').reduce((acc, curr) => {
            const [key, order] = curr.split(':');
            acc[key] = order === 'desc' ? -1 : 1;
            return acc;
        }, {});
		query = query.sort(sortOptions);
	}

	return query;
};
