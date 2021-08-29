<template>
  <div class="p-3 flex" :class="[`bg-${number}`]">
    <span
      v-show="number"
      class="text-center m-auto "
      :class="[
        number > 4 ? 'text-txt-secondary' : 'text-txt-primary',
        number > 64 ? 'text-2xl lg:text-2xl' : 'text-3xl lg:text-3xl',
      ]"
      >{{ number }}</span
    >
  </div></template
>
<script>
export default {
  name: "Cell",
  props: { number: Number },
};
</script>
