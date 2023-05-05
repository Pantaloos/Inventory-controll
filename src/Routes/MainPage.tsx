import HeaderComponent from "../Components/Header/HeaderComponent";
import ItemsTable from "../Components/ItemsTable/ItemsTable";

const MainPage = () => {
  return (
    <div className="p-3">
      <HeaderComponent></HeaderComponent>
      <ItemsTable></ItemsTable>
    </div>
  );
};

export default MainPage;
