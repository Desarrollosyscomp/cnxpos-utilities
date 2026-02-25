import { watch } from "vue";
import { useAppStore } from "../../../../../../../store/app.store";
import type { Chart } from "chart.js";

export function useChartTheme(chartRef: () => Chart | null) {
  const appStore = useAppStore();

  const applyTheme = (chart: Chart, isDark: boolean) => {
    // legend
    if (chart.options.plugins?.legend?.labels) {
      chart.options.plugins.legend.labels.color =
        isDark ? "#ffffff" : "#000000";
    }

    // scales
    if (chart.options.scales) {
      Object.values(chart.options.scales).forEach((scale: any) => {
        if (scale.ticks) {
          scale.ticks.color = isDark ? "#ffffff" : "#000000";
        }
        if (scale.grid) {
          scale.grid.color = isDark
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.1)";
        }
      });
    }

    chart.update();
  };

  // aplicar al cambiar el tema
  watch(
    () => appStore.theme.dataTheme,
    (newTheme) => {
      const chart = chartRef();
      if (!chart) return;

      applyTheme(chart, newTheme === "dark");
    },
    { immediate: true }
  );
}