"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, IconButton } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import EditIcon from "@mui/icons-material/Edit";

const Page = () => {
  const router = useRouter();
  const [addSection, setAddSection] = useState(false);

  const [readData, setReadData] = useState([]);

  //crud get/read
  const userdtl = async () => {
    const response = await fetch("http://localhost:4000/", {
      method: "GET",
    });
    const data1 = await response.json();

    setReadData(data1);
    console.log("data1", data1);
  };

  useEffect(() => {
    userdtl();
  }, []);

  //crud delete
  const handleDelete = async (id) => {
    const response = await fetch("http://localhost:4000/" + id, {
      method: "DELETE",
    });

    if (response.status === 200) {
      alert("User deleted successfully.");

      userdtl();
    } else {
      alert("Failed to delete user.");
    }
  };

  const handleSubmit = async (data) => {
    router.push("/edit/" + data._id);
  };

  return (
    <>
      <div className="bg-blue">
        <div className="user-table">
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Users
          </Typography>
        </div>
        <div className="flex">
          <table className="tabledesign">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>phone</th>
                <th>address</th>
                <th>icons</th>
              </tr>
            </thead>
            <tbody>
              {readData.map((data) => (
                <tr key={data._id}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td>{data.phone}</td>
                  <td>{data.address}</td>
                  <td>
                    <span className="btn-flex ">
                      <IconButton
                        color="primary"
                        onClick={() => handleSubmit(data)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleDelete(data._id)}
                      >
                        <PersonRemoveIcon />
                      </IconButton>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;
