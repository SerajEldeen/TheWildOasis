// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabinTable } from "./useCabinTable";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function CabinTable() {
  const { isPending, cabins } = useCabinTable();
  // 1) FILTERING
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="Cabins" />;

  const filterValue = searchParams.get("discount") || "all";
  const filteredCabins = cabins.filter((cabin) => {
    if (filterValue === "all") return true;
    if (filterValue === "no-discount") return cabin.discount === 0;
    if (filterValue === "with-discount") return cabin.discount > 0;
    return false;
  });

  // 2) SORTING
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => a[field] - b[field] * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body>
          {sortedCabins.map((cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          ))}
        </Table.Body>
      </Table>
    </Menus>
  );
}
