<template>
    <div>
        <a-input-group>
            <a-cascader
                    v-model="selectedAddress"
                    :options="address"
                    @change="onAddressSelected"
                    placeholder="请选择城市"
            ></a-cascader>
            <a-input placeholder="请输入详细地址" v-model="detail" v-if="showDetail" @blur="onDetailBlur" style="width:200px"/>
        </a-input-group>
    </div>
</template>

<script>
    import {address} from "@/assets/js/cities";

    export default {
        name: "AddressInput",
        props: {
            value: {

            },
            showDetail: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                address,
                selectedAddress: [],
                detail: ''
            }
        },
        mounted() {
            console.log(this.value);
            const addressArr = this.value.split(',');
            if (this.showDetail) {
                if (addressArr.length >= 3) {
                    this.selectedAddress = addressArr.slice(0, addressArr.length);
                    this.detail = addressArr[addressArr.length - 1];
                } else {
                    throw new Error("address initialValue value is error!");
                }
            } else {
                if (addressArr.length >= 2) {
                    console.log(addressArr, addressArr.length);
                    this.selectedAddress = addressArr.slice(0, addressArr.length);
                } else {
                    throw new Error("address initialValue value is error!");
                }
            }

        },
        methods: {
            onAddressSelected(value) {
                this.selectedAddress = value;
                if (!this.showDetail) {
                    this.$emit("change", value.join(','));
                }
                if (this.detail) {
                    this.onDetailBlur();
                }
            },
            onDetailBlur() {
                let result = [
                    ...this.selectedAddress,
                    this.detail
                ];
                if (this.selectedAddress.length && this.detail) {
                    this.$emit('change', result.join(','));
                }
            }
        }
    }
</script>

<style scoped>

</style>
