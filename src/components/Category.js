import { Link } from "react-router-dom";

export default function Category({ categoryList, callBack }) {
  return (
    <>
      {categoryList.map((category) => (
        <Link
          key={category.objectId}
          to="/createcampaign"
          onClick={() => callBack(category.objectId)}
        >
          {category.name}
        </Link>
      ))}
    </>
  );
}
