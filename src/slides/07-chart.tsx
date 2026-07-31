import { Text, TextRun, BarChart, DoughnutChart, Notes } from "@zythum02/pptxgenjsx";
import { SlideBackground } from "../components/SlideBackground";
import { SectionHeader } from "../components/SectionHeader";
import { PageNumber } from "../components/PageNumber";
import { colors } from "../token/colors";
import { typography } from "../token/typography";

export default async function () {
  return (
    <>
      <SlideBackground color="light" />
      <PageNumber />
      <SectionHeader title="Chart" />

      {/* Subtitle */}
      <Text x={0.8} y={1.5} w={11.733} h={0.5} align="left" valign="middle">
        <TextRun
          text="Quarterly Performance Overview — 2026"
          options={{ fontSize: typography.size.lead, color: colors.muted }}
        />
      </Text>

      {/* ── Clustered Bar Chart (left) ── */}
      <BarChart
        x={0.8}
        y={2.2}
        w={5.8}
        h={4.8}
        data={[
          {
            name: "Revenue",
            labels: ["Q1", "Q2", "Q3", "Q4"],
            values: [125, 148, 136, 162],
          },
          {
            name: "Costs",
            labels: ["Q1", "Q2", "Q3", "Q4"],
            values: [82, 90, 85, 95],
          },
          {
            name: "Profit",
            labels: ["Q1", "Q2", "Q3", "Q4"],
            values: [43, 58, 51, 67],
          },
        ]}
        options={{
          showLegend: true,
          showValue: false,
          barGrouping: "clustered",
          chartColors: [colors.accent, colors.success, colors.amber500],
          catAxisLabelFontSize: 11,
          catAxisLabelColor: colors.slate600,
          valAxisLabelFontSize: 10,
          valAxisLabelColor: colors.slate400,
          valGridLine: { color: colors.borderLight, size: 0.5, style: "dash" },
          valAxisMinVal: 0,
          valAxisMaxVal: 200,
          valAxisMajorUnit: 50,
          valAxisDisplayUnit: "thousands",
        }}
      />

      {/* ── Doughnut Chart (right) ── */}
      <DoughnutChart
        x={7.0}
        y={2.2}
        w={5.533}
        h={4.8}
        data={[
          {
            name: "Market Share",
            labels: ["Widgets", "Gadgets", "Doohickeys", "Sprockets", "Other"],
            values: [35, 28, 18, 12, 7],
          },
        ]}
        options={{
          showLegend: true,
          showPercent: true,
          showTitle: false,
          chartColors: [
            colors.accent,
            colors.success,
            colors.amber500,
            colors.blue500,
            colors.slate400,
          ],
          holeSize: 50,
          dataLabelFontSize: 11,
          dataLabelColor: colors.slate800,
          dataLabelPosition: "ctr",
        }}
      />

      <Notes>
        This slide demonstrates the Chart component with two chart types: a clustered bar chart
        showing quarterly Revenue, Costs, and Profit trends, and a doughnut chart displaying market
        share distribution across product categories.
      </Notes>
    </>
  );
}
