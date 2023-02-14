<script lang="ts" setup>
import { Ref } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

type Props = {
  data: any;
};

const props = defineProps<Props>();

const chartData: Ref<ChartData> = ref({
  labels: props.data,
  datasets: [
    {
      data: props.data,
      borderColor: "#c62828",
      borderWidth: 1,
      tension: 0.5,
    },
  ],
});

const options = {
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
</script>

<template>
  <Line :data="chartData" :options="options" />
</template>
