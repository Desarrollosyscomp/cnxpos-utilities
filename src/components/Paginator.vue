<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue-demi";
import Icon from "./Icon.vue";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";

const props = defineProps({
  itemsPerPage: {
    type: Number,
    required: true,
    default: 10,
  },

  maxButtons: {
    type: Number,
    required: true,
    default: -1,
  },

  //   totalItems: {
  //     type: Number,
  //     required: true,
  //     default: -1,
  //   },

  totalPages: {
    type: Number,
    required: true,
    default: -1,
  },

  currentPage: {
    type: Number,
    required: true,
    default: -1,
  },
});

let side_buttons = reactive({
  left: 0,
  right: 0,
});

let table_results_num = ref(10);
const createSideButtonArray = (buttons_count, invert) => {
  let arr = [];
  if (invert) {
    for (
      let i = props.currentPage - buttons_count;
      i < props.currentPage;
      i++
    ) {
      arr.push(i);
    }
  } else {
    for (
      let i = props.currentPage + 1;
      i <= props.currentPage + buttons_count;
      i++
    ) {
      arr.push(i);
    }
  }
  return arr;
};

const calculateSideButtons = () => {
  let more_pages_than_buttons = props.maxButtons < props.totalPages;
  if (more_pages_than_buttons) {
    let n = props.currentPage - Math.ceil(props.maxButtons / 2);
    if (n <= 0) {
      let right_buttons_count = Math.floor(props.maxButtons / 2) - n;
      let left_buttons_count = Math.ceil(props.maxButtons / 2) - 1 + n;

      side_buttons.right = createSideButtonArray(right_buttons_count, false);
      side_buttons.left = createSideButtonArray(left_buttons_count, true);
    } else {
      let m =
        props.totalPages -
        (props.currentPage + Math.floor(props.maxButtons / 2));

      if (m <= 0) {
        let right_buttons_count = m + Math.floor(props.maxButtons / 2);
        let left_buttons_count = Math.ceil(props.maxButtons / 2) - 1 - m;

        side_buttons.right = createSideButtonArray(right_buttons_count, false);
        side_buttons.left = createSideButtonArray(left_buttons_count, true);
      } else {
        let right_buttons_count = Math.ceil(props.maxButtons / 2) - 1;
        let left_buttons_count = Math.floor(props.maxButtons / 2);
        side_buttons.right = createSideButtonArray(right_buttons_count, false);
        side_buttons.left = createSideButtonArray(left_buttons_count, true);
      }
    }
  }
};

const onChangePage = (page) => {
  emit("onChangePage", {
    name: "Paginator.onChangePage",
    data: { page },
  });
};

const emit = defineEmits(["onChangePage"]);

const showLeftArrows = computed(() => {
  let more_pages_than_buttons = props.maxButtons < props.totalPages;
  let exist_pages_before = Math.ceil(props.maxButtons / 2) < props.currentPage;

  return exist_pages_before && more_pages_than_buttons;
});

const showRightArrows = computed(() => {
  let more_pages_than_buttons = props.maxButtons < props.totalPages;
  let exist_pages_after =
    props.currentPage + Math.floor(props.maxButtons / 2) < props.totalPages;

  return exist_pages_after && more_pages_than_buttons;
});

const buttons = computed(() => {
  if (props.maxButtons >= props.totalPages) {
    let aux_array = [];
    for (let i = 1; i <= props.totalPages; i++) {
      aux_array.push(i);
    }
    return aux_array;
  } else {
    return [props.currentPage];
  }
});

const leftButtons = computed(() => {
  let more_pages_than_buttons = props.maxButtons < props.totalPages;
  if (more_pages_than_buttons) {
    return [0, 1, 2, 3];
  } else {
    return [];
  }
});

onMounted(() => {
  calculateSideButtons();
});
</script>
<template>
  <ul class="pagination">
    <!-- <li class="paginate_button" v-if="showLeftArrows">
            <a class="page-link " @click="onChangePage(1)"> F </a>
        </li> -->
    <li
      class="paginate_button clickable"
      v-if="showLeftArrows"
      @click="onChangePage(currentPage - 1)"
    >
      <a type="button" class="page-link">
        <Icon :path="mdiChevronLeft" class="icon-size" />
      </a>
    </li>

    <li
      class="paginate_button clickable"
      v-for="i in side_buttons.left"
      :key="i"
      @click="onChangePage(i)"
    >
      <a class="page-link">{{ i }}</a>
    </li>

    <li
      class="paginate_button clickable"
      :class="[currentPage === j && 'active']"
      v-for="j in buttons"
      :key="j"
      @click="onChangePage(j)"
    >
      <a class="page-link">{{ j }}</a>
    </li>

    <li
      class="paginate_button clickable"
      v-for="k in side_buttons.right"
      :key="k"
      @click="onChangePage(k)"
    >
      <a class="page-link">{{ k }}</a>
    </li>

    <li
      class="paginate_button clickable"
      v-if="showRightArrows"
      @click="onChangePage(currentPage + 1)"
    >
      <a class="page-link">
        <div class="icon-container">
          <Icon :path="mdiChevronRight" class="icon-size" />
        </div>
      </a>
    </li>
    <!-- <li class="paginate_button" v-if="showRightArrows">
        <a class="page-link " @click="onChangePage(totalPages)"> L </a>
      </li> -->
  </ul>
</template>
<style scoped>
@import "../styles/style.css";

.pagination {
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.paginate_button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  margin: 0 2px;
  border: 1px solid var(--color-contrast);
  border-radius: 3px;
  transition: 0.1s;
  font-size: 11px;
  color: var(--color-contrast);
}
.paginate_button:hover {
  transition: 0.1s;
}
.active {
  /* box-shadow: 0px 0px 6px 0 var(--color-accent); */
  border: 1px solid var(--color-accent);
  background-color: var(--color-accent);
  color: #ffffff;
  border-radius: 3px;
  font-weight: bold;
}

.icon-size {
  width: 13px;
  height: 13px;
  fill: var(--color-contrast);
}

@media (min-width: 360px) {
  .paginate_button {
    font-size: 15px;
    margin: 0 4px;
    padding: 2px 10px;
  }
  .icon-size {
    width: 15px;
    height: 15px;
  }
}
</style>
