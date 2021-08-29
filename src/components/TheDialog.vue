<template>
  <div
    class="z-10 absolute top-0 h-full w-full bg-white bg-opacity-40 text-txt-primary"
  >
    <div class="flex items-center h-full w-full m-auto">
      <div class="flex flex-col items-center flex-grow w-full">
        <h2 class="flex text-2xl m-4">{{ content.message }}</h2>
        <button
          class="bg-txt-primary text-txt-secondary p-4 text-md font-bold"
          @click="reloadPage"
        >
          {{ content.buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheDialog",
  props: {
    content: Object,
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>
<style scoped></style>
