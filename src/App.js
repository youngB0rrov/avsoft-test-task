import React, {useEffect, useState} from "react";
import Table from "./components/Table";
import axios from "axios";
import Preloader from "./components/Preloader";
import CurrentRowData from "./components/CurrentRowData";
import Input from "./components/Input";
import Filter from "./components/SelectFilter";
import Paginator from "./components/Paginator";
import StartButton from "./components/StartButton";


function App() {
  const [isClicked, setIsClicked] = useState(false)
  const [data, setData] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)
  const [filerData, setFilterData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortDirection, setSortDirection] = useState(true)
  const [rowData, setRowData] = useState({})
  const [select, setSelect] = useState('id')
  const dataUrl = 'https://jupiter.avsw.ru/testcases/data'
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const [currentItems, setCurrentItems] = useState([])

  const getItemsPerPage = (e) => {
    setItemsPerPage(e.target.value)
    if(isFiltered) {
      setCurrentItems(filerData.slice(firstItemIndex, lastItemIndex))
    } else {
      setCurrentItems(data.slice(firstItemIndex, lastItemIndex))
    }
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    console.log(currentPage)
    console.log(firstItemIndex, lastItemIndex)
    if(isFiltered) {
      setCurrentItems(filerData.slice(firstItemIndex, lastItemIndex))
    } else {
      setCurrentItems(data.slice(firstItemIndex, lastItemIndex))
    }
  }

  const  getSelect = (e) => {
    setSelect(e.target.value)
  }

  const filerSearch = (value) => {
    setIsFiltered(true)
    const filterStr = value
    const arrayFilter = data.filter((item, index) => {
      return item[select].toString().toLowerCase().includes(filterStr.toLowerCase())
    })
    if(!filterStr) {
      setCurrentItems(data.slice(firstItemIndex, lastItemIndex))
      setIsFiltered(false)
    } else {
      setCurrentItems(arrayFilter.slice(firstItemIndex, lastItemIndex))
      setFilterData(arrayFilter)
    }
  }

  const sortFunction = (field) => {
    const arrayCopy = currentItems.slice()
    const sortArray = arrayCopy.sort((a, b) => {
      if(sortDirection) {
        return (a[field] > b[field] ? 1 : -1)
      } else {
        return (a[field] > b[field] ? -1 : 1)
      }
    })
    setCurrentItems(sortArray)
    setSortDirection(!sortDirection);
  }

  const getRowData = (item) => {
    setRowData(item)
  }

  useEffect(() => {
    axios.get(dataUrl)
        .then((res) => {
              setData(res.data.data)
              setCurrentItems(res.data.data.slice(firstItemIndex, lastItemIndex))
              setIsLoading(false)
            }
        )
  }, [])

  return (
    <div className="container">
      {(isLoading) ? (<Preloader/>) : (<div>
        <Input filterSearch={filerSearch}/> <Filter getSelect={getSelect}/>
        <Table data={currentItems}
               sortData={sortFunction}
               getRowData={getRowData}
               sortDirection={sortDirection}/>
      </div>)
      }
      <CurrentRowData row={rowData}/>
      <Paginator
          itemsPerPage={itemsPerPage}
          totalItemsAmount={data.length}
          paginate={paginate}
          isFiltered={isFiltered}
          filterData={filerData}
          getItemsPerPage={getItemsPerPage}
      />
    </div>
  );
}

export default App;
