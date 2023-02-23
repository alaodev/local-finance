import { Ref } from "vue";
import { useStorage } from "@vueuse/core";
import { RequestRegulatorType } from "~~/types/request-regulator";
import { nowInMilliseconds } from "~~/utils/date";

export const useRequestRegulator = defineStore("request-regulator", () => {
  const requestRegulator: Ref<{ [key: string]: RequestRegulatorType }> =
    useStorage("vue-storage-request-regulator", {});

  function checkRequest(regulator: RequestRegulatorType) {
    const now = nowInMilliseconds();
    const range = regulator.requestTime + regulator.increaseTime;
    return now > range;
  }

  function registerRequest(key: string, time: number) {
    requestRegulator.value[key] = {
      requestTime: nowInMilliseconds(),
      increaseTime: time,
    };
  }

  function validate(key: string, time: number) {
    const regulator = requestRegulator.value[key];
    if (!regulator) {
      registerRequest(key, time);
      return true;
    }
    const canRequest = checkRequest(regulator);
    if (canRequest) {
      registerRequest(key, time);
      return true;
    }
    return false;
  }

  return { validate };
});
