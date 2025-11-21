import { gql, request } from "graphql-request";
import { NextResponse } from "next/server";

const query = gql`
  {
    transfers(first: 10) {
      id
      to
      from
      value
      blockNumber
      blockTimestamp
      transactionHash
    }
    # ... rest of your query
  }
`;

export async function GET() {
  const url = process.env.SUBGRAPH_URL!; // Server-side only!
  const headers: Record<string, string> = process.env.GRAPH_API_KEY
    ? { Authorization: `Bearer ${process.env.GRAPH_API_KEY}` }
    : {};

  try {
    const data = await request(url, query, {}, headers);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
