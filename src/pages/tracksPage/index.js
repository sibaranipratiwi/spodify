import React from "react";
import SearchSong from "../../components/Search";
import ShowTracks from "../../components/tracks";
import data from "../../data/data";

const ListTracks = () => {
  return (
    <div>
      <SearchSong />
      {/* <Home name="Pratiwi" message="You can do THIS" select="Select"/> */}
      {data.map((item) => (
        <ShowTracks
          key={item.id}
          img={item.album.images[1].url}
          title={item.name}
          artist={item.artists[0].name}
        />
      ))}
    </div>
  );
};

export default ListTracks;
