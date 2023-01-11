import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "state";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { toast } from "react-toastify";
import AxiosPrivate from "api/AxiosPrivate";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import AdNavbar from "scenes/admin/adNavbar/AdNavbar";
import AdSidebar from "scenes/admin/sidebar/AdSidebar";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function BasicTable() {
  const [filters, setFilters] = React.useState({
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });
  const dispatch = useDispatch();
  const axios = AxiosPrivate();
  const [a, setA] = React.useState();
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  console.log(token);
  React.useEffect(() => {
    const controller = new AbortController();
    let isMount = true;
    const fetchUser = async () => {
      try {
        const users = await axios.get("/admin/users", {
          signal: controller.signal,
        });
        dispatch(setUsers({ users: users.data }));
      } catch (error) {
        console.log(error);
      }
    };
    if (isMount) fetchUser();
    return () => {
      isMount = false;
      controller.abort();
    };
  }, []);
  const Actiion = (e) => {
    const id = e._id;
    const handleClick = async (id) => {
      try {
        await axios.patch(`/admin/users/${id}`).then(async (e) => {
          const users = await axios.get("/admin/users");
          dispatch(setUsers({ users: users.data }));
          toast.success("user updated successfull");
        });
      } catch (error) {
        toast.error("something went wrong please try after sometime");
      }
    };
    return (
      <div>
        <button onClick={() => handleClick(id)}>
          {e.block ? "Unblock" : "Block"}
        </button>
      </div>
    );
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          marginTop: "2rem",
          marginLeft: "1rem",
          marginRight: "1rem",
        }}
      >
        <div className="card">
          <InputText
            onInput={(e) =>
              setFilters({
                global: {
                  value: e.target.value,
                  matchMode: FilterMatchMode.CONTAINS,
                },
              })
            }
            placeholder="search . . . "
          />
          <DataTable
            value={users}
            responsiveLayout="scroll"
            filters={filters}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 15]}
          >
            <Column field="_id" header="User Id"></Column>
            <Column field="firstName" header="First Name" sortable></Column>
            <Column field="lastName" header="Last Name" sortable></Column>
            <Column field="email" header="Email" sortable></Column>
            <Column field="action" header="Action" body={Actiion}></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
}
