<!-- ==================== COMPONENTE: CenterAndScroll ==================== -->
<!-- Centra verticalmente el contenido del slot y permite desplazamiento. -->
<template>
  <div class="parent scrollable-y">
    <div class="child">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.parent {
  flex: 1;
  display:flex;
  flex-direction: column;
} 
.child {
  margin: auto 0;
}
</style>
