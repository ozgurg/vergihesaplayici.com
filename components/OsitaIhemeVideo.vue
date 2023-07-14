<template>
    <a
        v-ripple=""
        class="d-inline-flex overflow-hidden rounded grey darken-4"
        href="https://youtu.be/LPrhPC-L5Go?t=5"
        rel="nofollow noopener noreferrer"
        target="_blank"
        title="Osita Iheme">
        <v-responsive
            :aspect-ratio="1"
            class="d-inline-flex">
            <video
                class="rounded"
                width="256"
                height="256"
                autoplay=""
                loop=""
                muted=""
                playsinline=""
                preload="none">
                <source
                    src="@/assets/video/osita-iheme.mp4"
                    type="video/mp4" />
            </video>
        </v-responsive>
    </a>
</template>
