<template>
    <div v-bind="$attrs">
        <a
            href="https://youtu.be/LPrhPC-L5Go?t=5"
            rel="nofollow noopener noreferrer"
            title="Osita Iheme"
            target="_blank">
            <video
                autoplay=""
                loop=""
                muted=""
                playsinline=""
                width="300"
                height="300">
                <source
                    :src="require('@/assets/video/osita-iheme.webm')"
                    type="video/webm" />
                <source
                    :src="require('@/assets/video/osita-iheme.mp4')"
                    type="video/mp4" />
            </video>
        </a>
        <div class="caption">
            Osita Iheme
        </div>
    </div>
</template>

<style scoped="">
video {
    height: auto;
    max-width: 100%
}
</style>
