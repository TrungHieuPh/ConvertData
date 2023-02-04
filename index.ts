// internal data types
type ShoppingItemType = {
  title: string;
  price: number;
  currency: string;
  date: string;
};
interface INodeElement {
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;
  shoppingItemsList?: ShoppingItemType[];
}
type Chat = {
  title: string;
  nodesList: INodeElement[];
};
// external data types
type Timestamp = {
  seconds: number;
  nanos: number;
};
type ExtShoppingItemType = {
  Title: string;
  Price: number;
  Currency: string;
  Date: Timestamp;
};
interface IExtNodeElement {
  FirstName: string;
  LastName: string;
  Age: number;
  BirthDate: Timestamp;
  ShoppingItems: ExtShoppingItemType[];
}
type ExtChat = {
  Title: string;
  ChatItems: IExtNodeElement[];
};

/* function convertData(internalData: Chat): ExtChat {
  return {
    Title: internalData.title,
    ChatItems: internalData.nodesList.map((node) => {
      return {
        FirstName: node.firstName,
        LastName: node.lastName,
        Age: node.age,
        BirthDate: {
          seconds: Number(new Date(node.birthDate).getTime() / 1000),
          nanos: 0,
        },
        ShoppingItems: node.shoppingItemsList
          ? node.shoppingItemsList.map((item) => {
              return {
                Title: item.title,
                Price: item.price,
                Currency: item.currency,
                Date: {
                  seconds: Number(new Date(item.date).getTime() / 1000),
                  nanos: 0,
                },
              };
            })
          : [],
      };
    }),
  };
} */
//  Hàm TypeScript để chuyển kiểu dữ liệu bên trong sang kiểu dữ liệu bên ngoài
function convertData(internalData: Chat): ExtChat {
  // Tạo một đối tượng kết quả trống
  const result: ExtChat = {
    Title: internalData.title,
    ChatItems: [],
  };

  // Lặp lại các nodeList trong dữ liệu nội bộ
  internalData.nodesList.forEach((node) => {
    // Tạo một đối tượng ExtNodeElement mới
    const extNode: IExtNodeElement = {
      FirstName: node.firstName,
      LastName: node.lastName,
      Age: node.age,
      BirthDate: {
        seconds: new Date(node.birthDate).getTime() / 1000,
        nanos: 0,
      },
      ShoppingItems: [],
    };

    //  Nếu node có shoppingItemsList, duyệt qua nó
    if (node.shoppingItemsList) {
      node.shoppingItemsList.forEach((item) => {
        //  Tạo một đối tượng ExtShopingItemType mới và thêm nó vào mảng ShoppingItems
        extNode.ShoppingItems.push({
          Title: item.title,
          Price: item.price,
          Currency: item.currency,
          Date: {
            seconds: new Date(item.date).getTime() / 1000,
            nanos: 0,
          },
        });
      });
    }

    // Thêm node đã chuyển đổi vào mảng ChatItems trong đối tượng kết quả
    result.ChatItems.push(extNode);
  });

  // Trả về đối tượng kết quả
  return result;
}
