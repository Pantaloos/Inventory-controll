import axios from "axios";
import HeaderComponent from "../Components/Header/HeaderComponent";
import ItemsTable from "../Components/ItemsTable/ItemsTable";
import { useState, useEffect } from "react";

interface Item {
  id: string;
  name: string;
  location: string;
  price: number;
}

interface SortingOptions {
  columnName: string;
  order: string;
}

const MainPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [locationName, setLocationName] = useState<string>();
  const [pageNumber, setPageNumber] = useState(1);
  const [sortingOptions, setSortingOptions] = useState<SortingOptions>();

  const handleSubmit = (
    filterValue: string,
    sortingOptions: SortingOptions
  ) => {
    setPageNumber(1);
    setLocationName(filterValue);
    setSortingOptions(sortingOptions);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/inventory/${pageNumber}`, {
        params: {
          locationName: locationName,
          columnName: sortingOptions?.columnName,
          order: sortingOptions?.order,
        },
      })
      .then((response) => {
        const newUsers = response.data.rows;
        setTotalItems(response.data.count);
        setItems(newUsers);
      })
      .catch((error) => console.error(error));
  }, [locationName, sortingOptions, pageNumber, setTotalItems, setItems]);

  return (
    <div className="p-3">
      <HeaderComponent onSubmit={handleSubmit}></HeaderComponent>
      <ItemsTable
        items={items}
        currentPage={pageNumber}
        onPageChange={(pageNumber: number) => setPageNumber(pageNumber)}
        totalItems={totalItems}
      ></ItemsTable>
    </div>
  );
};

export default MainPage;
