import { InputAdornment, TextField, Button } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentSearchType, setCurrentSearchType] = useState("title");

    const handleClickSearch = () =>{
        switch (currentSearchType) {
            case "content":
                navigate("/van-ban?search=" + searchTerm)
                break;
            case "title":
                navigate("/ho-so?title=" + searchTerm)
                break;
            default:
                break;
        }
    }

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.key === "Enter" || event.type === "click") {
            handleClickSearch();
        }
    };

    const handleChangeType = (type) => {
        setCurrentSearchType(type);
    }

    return (
        <div >
            <div className="flex items-left">
                <Button
                    sx={{
                        fontSize: "10px",
                        background: `${currentSearchType === "title" ? "#1876d2" : "#ccc"}`,
                        color: "#fff",
                        borderRadius: "0px",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        "&:hover": {
                            background: "#000",
                            color: "#fff",
                        },
                    }}
                    onClick={() => handleChangeType("title")}
                >Tìm kiếm theo tiêu đề hồ sơ</Button>
                <Button
                    sx={{
                        fontSize: "10px",
                        background: `${currentSearchType === "content" ? "#1876d2" : "#ccc"}`,
                        color: "#fff",
                        borderRadius: "0px",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        "&:hover": {
                            background: "#000",
                            color: "#fff",
                        },
                    }}
                    onClick={() => handleChangeType("content")}
                >Tìm kiếm theo nội dung văn bản</Button>
            </div>
            <TextField
                id="search"
                type="search"
                placeholder="Nhập từ khoá"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleChange}
                sx={{
                    width: 600,
                    marginTop: "10px",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add shadow
                }}
                InputProps={{
                    style: {
                        borderRadius: "0px",
                        background: "#fff",
                    },
                    endAdornment: (
                        <InputAdornment position="end" onClick={handleClickSearch} sx={{
                            cursor: "pointer"
                        }}>
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

export default SearchBar
