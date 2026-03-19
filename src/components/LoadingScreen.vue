<template>
  <div id="loading-screen-progress" align="center">
    <br />
    <br />
    <b>Cargando .....</b>
  </div>
  <div id="loading-screen-background"></div>
</template>

<style scoped>
#loading-screen-background {
  z-index: 5000; /* estaba en 9999 pero mal ordenado */
  background: white;
  opacity: 0.7;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

#loading-screen-progress {
  position: fixed;
  z-index: 5001; /* más alto que el fondo */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
