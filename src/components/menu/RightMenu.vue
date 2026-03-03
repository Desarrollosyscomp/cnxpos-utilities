<template>
    <div class="right-menu">
        <div class="right-menu-box-wrapper">
            <div class="hover-bar-wrapper">
                <div class="hover-bar"></div>
            </div>
            <div class="right-menu-box">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<style scoped>

:global(:root){
    --right-menu-box-proportion: 1;
}
.right-menu{
    position:absolute;
    bottom: 0;
    height: 100%;
    right:0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform: translateX(70%);
    transition: 0.4s ease;
}
.right-menu:hover{
    transform: translateX(0);
    transition: 0.4s ease;
}
.right-menu-box-wrapper{
    display: flex;
}
.hover-bar-wrapper{
    border-radius:
        calc(var(--right-menu-box-proportion) * 15px)
        0
        0
        calc(var(--right-menu-box-proportion) * 15px);
    bottom: 0;
    left: 0;
    background-color: var(--color-primary-dark-2);
    display: flex;
    align-items: center;
    padding-left: calc(var(--right-menu-box-proportion) * 10px);
}
.hover-bar{
    width: 7px;
    height: 50px;   
    border-radius: 10px;
    background: var(--color-contrast);
}

.right-menu-box{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary-dark-2);
    padding: calc(var(--right-menu-box-proportion) * 3px);
    padding-left: calc(var(--right-menu-box-proportion) * 9px);
    padding-top: calc(var(--right-menu-box-proportion) * 40px);
    padding-bottom: calc(var(--right-menu-box-proportion) * 40px);
    
    gap: calc(var(--right-menu-box-proportion) * 15px);

}

.right-menu-box > *{
    fill: var(--color-contrast);
    width: calc(var(--right-menu-box-proportion) * 40px);
    height: calc(var(--right-menu-box-proportion) * 40px);
    transition: 0.4s ease;
    position:relative;
}
.right-menu-box > *:hover{
    width: calc(var(--right-menu-box-proportion) * 60px);
    height: calc(var(--right-menu-box-proportion) * 60px);
    transition: 0.3s ease;
}



@media (min-width: 1920px){
    :global(:root){
        --right-menu-box-proportion: 1.4;
    }
}
@media (min-width: 2560px){
    :global(:root){
        --right-menu-box-proportion: 1.7;
    }
}


</style>