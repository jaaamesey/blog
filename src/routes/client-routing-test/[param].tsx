import { A, useParams } from "@solidjs/router";

export default function () {
  const params = useParams();
  return (
    <>
      {params.param}
      <A href={"/client-routing-test/" + params.param + "1"}>next</A>
    </>
  );
}
