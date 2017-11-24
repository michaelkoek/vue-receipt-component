<template>

    <div class="qwadd-invoice">
        <div class="content-box">
            <h3 class="qwadd-invoice__title">{{ name }}</h3>
            <ul class="qwadd-invoice__list qwadd-invoice__products">
                <slot></slot>
            </ul>

            <slot name="summary"></slot>
        </div>
    </div>

</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: "My custom Invoice header"
            }
        }
    }
</script>
