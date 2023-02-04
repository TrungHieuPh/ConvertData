function convertData(internalData) {
    return {
        Title: internalData.title,
        ChatItems: internalData.nodesList.map(function (node) {
            return {
                FirstName: node.firstName,
                LastName: node.lastName,
                Age: node.age,
                BirthDate: {
                    seconds: Number(new Date(node.birthDate).getTime() / 1000),
                    nanos: 0
                },
                ShoppingItems: node.shoppingItemsList
                    ? node.shoppingItemsList.map(function (item) {
                        return {
                            Title: item.title,
                            Price: item.price,
                            Currency: item.currency,
                            Date: {
                                seconds: Number(new Date(item.date).getTime() / 1000),
                                nanos: 0
                            }
                        };
                    })
                    : []
            };
        })
    };
}
