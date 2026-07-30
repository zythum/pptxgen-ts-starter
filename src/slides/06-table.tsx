import { Text, TextRun, Table, TableRow, TableCell, Notes } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { SectionHeader } from "../components/SectionHeader";
import { PageNumber } from "../components/PageNumber";

export default async function () {
  return (
    <>
      <SlideBackground color="light" />
      <PageNumber />
      <SectionHeader title="Table" />

      {/* Subtitle */}
      <Text x={0.8} y={1.5} w={11.733} h={0.5} align="left" valign="middle">
        <TextRun text="Quarterly Sales Report — 2026" options={{ fontSize: 16, color: "6B7280" }} />
      </Text>

      {/* Table */}
      <Table
        x={0.8}
        y={2.2}
        w={11.733}
        h={4.6}
        colW={[3.2, 2.133, 2.133, 2.133, 2.134]}
        rowH={[0.55, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42, 0.55]}
        border={{ type: "solid", color: "E2E8F0", pt: 1 }}
      >
        {/* Header row */}
        <TableRow>
          <TableCell
            bold
            fontSize={13}
            color="FFFFFF"
            fill={{ color: "1E293B" }}
            align="center"
            valign="middle"
          >
            Product
          </TableCell>
          <TableCell
            bold
            fontSize={13}
            color="FFFFFF"
            fill={{ color: "1E293B" }}
            align="center"
            valign="middle"
          >
            Q1
          </TableCell>
          <TableCell
            bold
            fontSize={13}
            color="FFFFFF"
            fill={{ color: "1E293B" }}
            align="center"
            valign="middle"
          >
            Q2
          </TableCell>
          <TableCell
            bold
            fontSize={13}
            color="FFFFFF"
            fill={{ color: "1E293B" }}
            align="center"
            valign="middle"
          >
            Q3
          </TableCell>
          <TableCell
            bold
            fontSize={13}
            color="FFFFFF"
            fill={{ color: "1E293B" }}
            align="center"
            valign="middle"
          >
            Q4
          </TableCell>
        </TableRow>

        {/* Data rows with alternating background */}
        {[
          { name: "Widget A", q1: "4.5", q2: "5.2", q3: "4.8", q4: "5.6" },
          { name: "Widget B", q1: "3.8", q2: "4.1", q3: "4.3", q4: "4.9" },
          { name: "Gadget X", q1: "6.2", q2: "5.9", q3: "6.5", q4: "7.1" },
          { name: "Gadget Y", q1: "2.1", q2: "2.8", q3: "2.5", q4: "3.2" },
          { name: "Doohickey", q1: "5.5", q2: "6.0", q3: "5.8", q4: "6.2" },
          { name: "Thingamajig", q1: "3.0", q2: "3.5", q3: "3.2", q4: "3.8" },
          { name: "Flux Capacitor", q1: "1.8", q2: "2.1", q3: "1.5", q4: "2.0" },
          { name: "Sprocket", q1: "4.2", q2: "4.5", q3: "4.0", q4: "4.7" },
        ].map((row, ri) => {
          const bgColor = ri % 2 === 0 ? "FFFFFF" : "F8FAFC";
          return (
            <TableRow>
              <TableCell
                fontSize={12}
                color="1F2937"
                fill={{ color: bgColor }}
                align="left"
                valign="middle"
                bold
              >
                {row.name}
              </TableCell>
              <TableCell
                fontSize={12}
                color="334155"
                fill={{ color: bgColor }}
                align="center"
                valign="middle"
              >
                {row.q1}
              </TableCell>
              <TableCell
                fontSize={12}
                color="334155"
                fill={{ color: bgColor }}
                align="center"
                valign="middle"
              >
                {row.q2}
              </TableCell>
              <TableCell
                fontSize={12}
                color="334155"
                fill={{ color: bgColor }}
                align="center"
                valign="middle"
              >
                {row.q3}
              </TableCell>
              <TableCell
                fontSize={12}
                color="334155"
                fill={{ color: bgColor }}
                align="center"
                valign="middle"
              >
                {row.q4}
              </TableCell>
            </TableRow>
          );
        })}

        {/* Total row */}
        <TableRow>
          <TableCell
            bold
            fontSize={13}
            color="1E293B"
            fill={{ color: "EDE9FE" }}
            align="left"
            valign="middle"
          >
            Total Revenue (K)
          </TableCell>
          <TableCell
            bold
            fontSize={13}
            color="1E293B"
            fill={{ color: "EDE9FE" }}
            align="center"
            valign="middle"
          >
            31.1
          </TableCell>
          <TableCell
            bold
            fontSize={13}
            color="1E293B"
            fill={{ color: "EDE9FE" }}
            align="center"
            valign="middle"
          >
            34.1
          </TableCell>
          <TableCell
            bold
            fontSize={13}
            color="1E293B"
            fill={{ color: "EDE9FE" }}
            align="center"
            valign="middle"
          >
            32.6
          </TableCell>
          <TableCell
            bold
            fontSize={13}
            color="1E293B"
            fill={{ color: "EDE9FE" }}
            align="center"
            valign="middle"
          >
            37.5
          </TableCell>
        </TableRow>
      </Table>

      <Notes>
        This slide demonstrates the Table component with header row, alternating row backgrounds,
        and a total row. The table has 5 columns and 10 rows.
      </Notes>
    </>
  );
}
