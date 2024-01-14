import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UsersModel } from "../features/users/UsersModel";
import { selectAllUsers } from "../features/users/usersSlice";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const users = useSelector(selectAllUsers);
  const [searchResult, setSearchResult] = useState<UsersModel[]>([]);

  const navigation = useNavigate();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length !== 0) {
      setSearchResult(
        users.filter((user) =>
          user.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setSearchResult([]);
    }
    console.log(searchResult);
  };

  const handleShowUser = (user: UsersModel): void => {
    navigation(`/users/?user=${user.id}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        id="searchQuery"
        className="search-input"
        placeholder="Search user..."
        value={searchQuery}
        autoComplete="off"
        onChange={handleSearch}
      />
      {searchResult.length > 0 && (
        <div className="search-result-container">
          {searchResult.map((user) => (
            <div
              key={user.id}
              className="search-result-item"
              onClick={() => handleShowUser(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;