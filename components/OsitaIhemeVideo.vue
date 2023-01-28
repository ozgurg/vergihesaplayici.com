<template>
    <a
        v-ripple=""
        class="d-inline-flex"
        href="https://youtu.be/LPrhPC-L5Go?t=5"
        rel="nofollow noopener noreferrer"
        target="_blank"
        title="Osita Iheme">
        <video
            class="rounded"
            width="250"
            height="250"
            autoplay=""
            loop=""
            muted=""
            playsinline=""
            preload="none">
            <source
                :src="require('@/assets/video/osita-iheme.mp4')"
                type="video/mp4" />
        </video>
    </a>
</template>
