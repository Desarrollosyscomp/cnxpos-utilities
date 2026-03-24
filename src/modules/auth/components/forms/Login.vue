<template>
  <div class="login-container">
    <!-- USERNAME -->
    <input
      class="form-input"
      type="text"
      placeholder="Usuario"
      v-model="authForm.username"
      @blur="handleBlur('username')"
      @input="validateField('username')"
    />
    <span v-if="touched.username && errors.username" class="error-text">
      {{ errors.username }}
    </span>

    <!-- PASSWORD -->
    <input
      class="form-input"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Contraseña"
      v-model="authForm.password"
      @blur="handleBlur('password')"
      @input="validateField('password')"
      @keyup.enter="onSubmit"
    />
    <span v-if="touched.password && errors.password" class="error-text">
      {{ errors.password }}
    </span>

    <div class="forgot-password-label-container">
      <router-link to="/auth/forgot-password" class="text-color">
        Olvidé mi contraseña
      </router-link>
    </div>

    <div class="button-container">
      <button class="form-button" @click="onSubmit">Iniciar Sesión</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "../../store/auth.store";
import { type TFormLogin } from "../../interfaces/auth.type";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import { createAlertCore } from "../../../../components/beauty-alert/factory";
// import { vanillaAdapters as adapters} from "../../../../components/beauty-alert/adapters/vanilla";
import { vueAdapters as vueAdapters } from "../../../../components/beauty-alert/adapters/vue";
import { useAppStore } from "../../../../store/app.store";

// estado
const showPassword = ref(false);
const authStore = useAuthStore();
const appStore = useAppStore();
const router = useRouter();

const authForm = reactive<TFormLogin>({
  username: "",
  password: "",
});

// errores
const errors = reactive({
  username: "",
  password: "",
});

// control de interacción
const touched = reactive({
  username: false,
  password: false,
});

// validaciones Yup
const validations = {
  username: Yup.string().required("El nombre de usuario es requerido").trim(),
  password: Yup.string().required("La contraseña es requerida").trim(),
};

const validationSchema = Yup.object(validations);

// validar campo individual
const validateField = async (field: "username" | "password") => {
  try {
    await validations[field].validate(authForm[field]);
    errors[field] = "";
  } catch (e: any) {
    errors[field] = e.message;
  }
};

// cuando pierde focus
const handleBlur = (field: "username" | "password") => {
  touched[field] = true;
  validateField(field);
};

// submit
const onSubmit = async () => {
  try {
    await validationSchema.validate(authForm, { abortEarly: false });
    appStore.showLoadingScreen = true;

    // limpiar errores
    errors.username = "";
    errors.password = "";

    let response = await authStore.login(authForm);
    console.log(response.data);
    if (response.data.isLogged) {
      appStore.showLoadingScreen = false;
      router.push("/home/welcome");
    } else {
      appStore.showLoadingScreen = false;
      // const alert = createAlertCore(adapters);
      const alert2 = createAlertCore(vueAdapters);
      const r = await alert2.show("timer", {
        title: "Error",
        message: response.data,
        time: 5,
      }); 
      console.log(r);
    }
  } catch (e: any) {
    // marcar todos como tocados
    touched.username = true;
    touched.password = true;

    if (e.inner) {
      e.inner.forEach((err: any) => {
        errors[err.path as "username" | "password"] = err.message;
      });
    }
  }
};
</script>

<style scoped>
@import "../../../../styles/forms.css";

.login-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.text-color {
  color: var(--color-contrast);
  text-decoration: none;
  font-size: 13px;
}

.button-container {
  padding-top: 15px;
  width: 100%;
  text-align: center;
}

/* 🔴 errores */
.error-text {
  color: red;
  font-size: 12px;
}

/* opcional: borde rojo si hay error */
/* .form-input {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 5px;
} */
/* 
.form-input:focus {
  outline: none;
  border-color: #841811ff;
} */
</style>
