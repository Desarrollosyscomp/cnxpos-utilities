<template>
    <div class="bottom-menu"> 
      <slot></slot>
    </div>
</template>
<style scoped>

.bottom-menu{
  padding: 12px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 6px);
  background-color: var(--color-primary-dark);
  display: flex;
  justify-content: space-around;
}
.bottom-menu > *{
  width: 25px;
  height: 25px;
  fill: var(--color-contrast);
  transition: 0.4s ease;
}
@media (min-height: 800px){
  .bottom-menu > *{
    width: 35px;
    height: 35px;  
  }
}
</style>