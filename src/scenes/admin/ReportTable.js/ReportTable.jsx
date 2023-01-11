import { Button } from "@mui/material";
import AxiosPrivate from "api/AxiosPrivate";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ReportTable() {
    const [filters, setFilters] = React.useState({
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      });
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const axios = AxiosPrivate();
  useEffect((e) => {
    const controller = new AbortController();
    let isMount = true;
    const fetchReports = async () => {
      try {
        const { data } = await axios.get("/admin/report", {
          signal: controller.signal,
        });
        console.log(data);
        setReports(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (isMount) fetchReports();
    return () => {
      isMount = false;
      controller.abort();
    };
  }, []);
  const handleIgnore =async(id)=>{
    try {
        await axios.patch(`/admin/report/${id}`).then(async e=>{
            toast.success('Report Ignored Successfully')
            const { data } = await axios.get("/admin/report")
            setReports(data)
        })
    } catch (error) {
        console.log(error)
    }
  }
  const handleRemovePost =async(id)=>{
    try {
        await axios.delete(`/admin/report/${id}`).then(async e=>{
            toast.success("post Removed successfullt")
            const { data } = await axios.get("/admin/report")
            setReports(data)
        })
    } catch (error) {
        console.log(error)
    }
  }
  const Actions = (e) => {
    return (
      <div>
        <Button onClick={()=>handleRemovePost(e._id)}>Remove Post</Button>
        <Button onClick={()=>handleIgnore(e._id)}>Ignore</Button>
      </div>
    );
  };
  const reportColumn = (e) => {
    return e.reports.map((e) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>REMARK : {e.report}</span>
        <span>ReportedBy : {e.userid.firstName + " " + e.userid.lastName}</span>
      </div>
    ));
  };
  const postBody = (e) => {
    console.log(e);
    return (
      <div>
        <img
          src={e.postid.picturePath}
          height="100px"
          alt="post"
          onClick={() => window.location.assign(e.postid.picturePath)}
          style={{ display: "block" }}
        />
        <div style={{ display: "flex", flexDirection: "column" ,margin:'5px 0px'}}>
          <span>PostedBy : {e.postid.userId.firstName}</span>
          <span>Description : {e.postid.description}</span>
        </div>
      </div>
    );
  };
  const idBody =(e)=>{
    return(
        <span>... {e._id.slice(15)}</span>
    )
  } 
  return (
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
    value={reports}
    responsiveLayout="scroll"
    filters={filters}
    paginator
    rows={5}
    rowsPerPageOptions={[5, 10, 15]}
    >
      <Column field="_id" header="id" body={idBody} />
      <Column field="postid" header="Post" body={postBody} />
      <Column field="reports" header="Reports" body={reportColumn} />
      <Column field="action" header="Action" body={Actions} />
    </DataTable>
    </div>
    </div>
  );
}

export default ReportTable;
