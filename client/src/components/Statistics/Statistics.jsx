Statistics.jsx

import React, { useContext, useState, useEffect, Fragment } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from "react-router";
import { UserContext } from "../../Context/UserContext";
import storage from "../../firebase/firebase";
import { Loader } from "../Loader/Loader";
import axios from "axios";

const Statistics = () => {
    const { user, setUser } = useContext(UserContext);
    const [subjects, setSubjects] = useState([]);
    const [notes, setNotes] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

useEffect(() => {
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 768); 
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);
useEffect(() => {
    const fetchAllData = async () => {
        try {
            const fetchSubjects = async () => {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                };
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/subject`, config);
                setSubjects(res.data);
            };

            const fetchNotes = async () => {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                };
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/note`, config);
                setNotes(res.data);
            };

            const fetchUsers = async () => {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/leaderboard`);
                if (response.status === 200) {
                    setUsers(response.data);
                    console.log(response.data);
                }
            };

            await Promise.all([fetchSubjects(), fetchNotes(), fetchUsers()]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data", error);
            setLoading(false); 
        }
    };

    fetchAllData();
}, []);

    return (
        <div>
            {loading ? (
                <p><Loader/></p>
            ) : (
                <div>
                <Navbar />
                <div style={{ ...styles.cardBox, ...(isSmallScreen ? smallScreenStyles.cardBox : {}) }}>
                    <div style= {styles.subject}>
                    <div style= {styles.card} >
                        <div style= {styles.rectangle} className="rectangle">
                            <img
                                src="https://icons.iconarchive.com/icons/jozef89/services-flat/512/design-icon.png"
                                alt="Avatar"
                                style= {styles.avatar}
                                className="avatar"
                            />
                            <div style= {styles.pseudo} className="pseudo">
                                <b>Subjects</b>
                                <br />
                                <br />
                                <div style= {styles.cardExcerpt} className="card-excerpt">
                                    <p>{subjects.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div style= {styles.student} className="student">
                    <div style= {styles.card} className="card">
                        <div style= {styles.rectangle} className="rectangle">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3829/3829933.png"
                                alt="Avatar"
                                style= {styles.avatar}
                                className="avatar"
                            />
                            <div style= {styles.pseudo} className="pseudo">
                                <b>Students</b>
                                <br />
                                <br/>
                                <div style= {styles.cardExcerpt} className="card-excerpt">
                                    <p>{users.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div styles = {styles.notes} className="notes">
                    <div style= {styles.card} className="card">
                        <div style= {styles.rectangle} className="rectangle">
                            <img
                            src="   https://cdn-icons-png.flaticon.com/512/752/752326.png "
                                alt="Avatar"
                                style= {styles.avatar}
                                className="avatar"
                            />
                            <div style= {styles.pseudo} className="pseudo">
                                <b>Notes</b>
                                <br />
                                <br />
                                <div style={styles.cardExcerpt} className="card-excerpt">
                                    <p>{notes.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
    
                </div>
            )}

        </div>
    )
}

const smallScreenStyles = {
    uidesign: {
        flexDirection: "column",
    },
};
const styles = {
    cardBox: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    subject: {
      "> div": {
        background: "#f5f7cd"
      }
    },

    student: {
      "> div": {
        background: "#F0F4FF"
      }
    },
    notes: {
      "> div": {
        background: "#EFF8FF"
      }
    },
    card: {
        flex: "1 1 300px",
      boxShadow: "0 4px 8px 4px rgba(0, 0, 0, 0.4)",
      borderRadius: "15px",
      maxWidth: "300px",
      margin: "20px 10px"
    },
    minicard: {
      position: "relative",
      bottom: "30px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
      borderRadius: "15px",
      paddingTop: "10px",
      paddingRight: "20px",
      paddingBottom: "10px",
      paddingLeft: "20px",
      maxWidth: "170px",
      backgroundColor: "white",
      margin: "auto",
      textAlign: "center",
      font: '17px "Fira Sans", sans-serif',
      color: "grey"
    },
    rectangle: {
      position: "relative",
      width: "300px",
      height: "350px",
      background: "white"
    },
    rectangle2: {
      display: "block",
      textAlign: "center",
      position: "relative",
      width: "50px",
      height: "50px",
      background: "black"
    },
    avatar: {
      position: "relative",
      top: "30px",
      borderRadius: "50%",
      width: "120px",
      height: "120px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "50px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
    },
    pseudo: {
      position: "relative",
      top: "10px",
      textAlign: "center",
      color: "#100B51",
      fontSize: "25px",
      fontFamily: '"Helvetica Neue", Roboto, "Segoe UI", Calibri, sans-serif'
    },
    cardExcerpt: {
      font: '30px "Fira Sans", sans-serif',
      color: "grey"
    }
  };

export default Statistics
