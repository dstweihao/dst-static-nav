
<template>
    <div class="home-page">
        <div class="home-page-wrapper">
            <div class="home-page-nav">
                <el-menu class="home-page-nav-menu" :default-active="activeIndex" :default-openeds="openeds" @select="handleSelect">
                    <el-scrollbar>
                        <el-sub-menu v-for="(item, index) in navLists" :key="index" :index="item.label">
                            <template #title>
                                <span style="font-weight: bold; font-size: 16px;">{{ item.label }}</span>
                            </template>
                            <el-menu-item v-for="(nav, index) in item.chindren" :key="index" :index="nav.label">{{
                            nav.label
                        }}</el-menu-item>
                        </el-sub-menu>
                    </el-scrollbar>
                </el-menu>

            </div>
            <el-scrollbar class="home-page-list" ref="scrollbarRef" @scroll="scroll">
                <div class="home-page-list-search">
                    <el-image style="width: 50px; height: 50px" :src="LogoUrl" />
                    <span class="home-page-departmenet">DSTWEIHAO</span>
                </div>
                <el-input v-model="inputSearch" placeholder="不懂就搜，一搜就懂" class="home-page-list-search-input">
                    <template #prepend>
                        <el-select v-model="selectSearch" placeholder="Select" style="width: 120px;">
                            <el-option label="开发者搜索" value="dev" />
                            <el-option label="百度" value="baidu" />
                            <el-option label="必应" value="bing" />
                        </el-select>
                    </template>
                    <template #append>
                        <el-button style="width: 80px;" @click="buttonSearch">搜索</el-button>
                    </template>
                </el-input>
                <div v-for="(item, index) in navLists" :key="index">
                    <div class="home-page-list-layout" v-for="(model, i) in item.chindren" :key="i" :name="`${model.label}-card`">
                        <div class="home-page-list-nav-head" :name="model.label">
                            <span style="font-size: 16px; font-weight: bold;">{{ model.label }}</span>
                        </div>
                        <div class="home-page-list-wrapper">
                            <div class="home-page-list-card" v-for="(nav, j) in model.chindren" :key="j" @click="navSelectClicked(nav.value)">
                                <span>{{ nav.label }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 因为最后一项导航没有多余的空间，用于支撑与左侧菜单栏联动，然后滚动到顶部 -->
                <div :style="needSpaceStyle"></div>
            </el-scrollbar>
            <div class="home-page-backTop">
                <el-button v-show="isViewBackTopButton" class="home-page-backTop-button" :icon="CaretTop" circle plain @click="backTopClicked"></el-button>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import {
    ElButton,
    ElImage,
    ElInput,
    ElMenu,
    ElMenuItem,
    ElOption,
    ElScrollbar,
    ElSelect,
    ElSubMenu,
} from 'element-plus'
import { navLists } from '../assets/ts/navLists'
import LogoUrl from '../assets/images/logo.gif'
import { CaretTop } from '@element-plus/icons-vue'

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const inputSearch = ref('')

const selectSearch = ref('dev')

const needSpaceStyle = ref({
    height: '0px',
})

// 获取左侧菜单最后一项，基于它加上需补充的空间高度(浏览器内高度-卡片整个高度)
let lastNavName = navLists.at(-1)?.chindren.at(-1)?.label

onMounted(() => {
    let lastClientHeight = document.getElementsByName(`${lastNavName}-card`)[0]
        .clientHeight
    let needSpaceHeight = window.innerHeight - lastClientHeight - 40
    needSpaceStyle.value.height = `${needSpaceHeight}px`
})

const isViewBackTopButton = ref(false)

const backTopClicked = () => {
    // 返回顶部
    scrollbarRef.value!.setScrollTop(0)
}

const buttonSearch = () => {
    switch (selectSearch.value) {
        case 'dev':
            window.open(
                `https://kaifa.baidu.com/searchPage?wd=${inputSearch.value}&module=SEARCH`
            )
            break
        case 'baidu':
            window.open(`https://www.baidu.com/s?wd=${inputSearch.value}`)
            break
        case 'bing':
            window.open(`https://cn.bing.com/search?q=${inputSearch.value}`)
            break

        default:
            break
    }
}

// const navLists = ref<any>(navLists)

// 导航标题坐标集合
// let offsetTopList = ref<any>({})

// navLists.value.forEach((item: any) => {
//     item.chindren.forEach((nav: any) => {
//         offsetTopList.value[nav.label] = 0
//     });
// })

onMounted(() => {
    // 会触发12次，需要优化
    // for (const key in offsetTopList.value) {
    //     if (Object.prototype.hasOwnProperty.call(offsetTopList.value, key)) {
    //         let offsetTop = document.getElementsByName(key)[0].offsetTop
    //         scrollbarRef.value!.setScrollTop(offsetTop - 20)
    //         offsetTopList.value[key] = offsetTop
    //     }
    // }
    //
})

const activeIndex = ref('')

const openeds = ref(['通用', '项目'])

const handleSelect = (key: string, keyPath: string[]) => {
    let offsetTop = document.getElementsByName(key)[0].offsetTop
    scrollbarRef.value!.setScrollTop(offsetTop - 20)
}
const navSelectClicked = (href: string) => {
    window.open(href)
}
const scroll = ({ scrollTop }: any) => {
    if (scrollTop >= 300) {
        isViewBackTopButton.value = true
    }
    isViewBackTopButton.value = scrollTop >= 500 ? true : false
    // window.innerHeight

    //
    // 937 - 247
    let offsetTop = document.getElementsByName('老版项目维护-card')

    // if (scrollTop >= (210 - 20)) {
    //     activeIndex.value = '常用站点'
    // }
    // for (const key in offsetTopList.value) {
    //
    //
    //     if (scrollTop == offsetTopList.value[key]) {
    //
    //         activeIndex.value = key
    //     }
    // }
}
</script>
<style scoped>
.home-page {
    width: 100%;
    height: 100%;
    background-color: #edf0f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    overflow-y: scroll;
}

.home-page-wrapper {
    width: 1300px;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
}

.home-page-nav {
    width: 400px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #edf0f7;
}

.home-page-nav-menu {
    width: 200px;
    height: 800px;
    background-color: #edf0f7;
}

.home-page-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
}

.home-page-list-search {
    width: 100%;
    height: 120px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.home-page-departmenet {
    margin-left: 20px;
    font-size: 26px;
}

.home-page-list-search-input {
    width: 955px;
    height: 50px;
    margin-left: 20px;
    margin-bottom: 20px;
    text-align: center;
}

.home-page-list-layout {
    margin: 20px 40px 20px 20px;
}

.home-page-list-nav-head {
    width: 100%;
    height: 50px;
    padding-left: 15px;
    text-align: left;
    display: flex;
    align-items: center;
    background-color: #ecf5ff;
    border-radius: 4px;
    border-left: 5px solid #409eff;
    /* margin: 20px 0; */
}

.home-page-list-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 20px;
}
.home-page-list-card {
    align-items: center;
    background-color: #f5f5f5;
    border: 1px solid transparent;
    border-radius: 16px;
    box-shadow: 4px 4px 8px 0px rgba(1, 1, 2, 0.13);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    max-width: 154px;
    padding: 8px;
    margin: 10px;
    text-align: center;
}

.home-page-list-card:hover {
    background-color: #1890ff;
    color: #ffffff;
}
.home-page-backTop {
    position: relative;
    background-color: #edf0f7;
}
.home-page-backTop-button {
    position: absolute;
    left: 50px;
    bottom: 50px;
}
</style>
<style>
.el-select .el-input__wrapper {
    cursor: pointer;
    height: 50px;
}

.el-input-group__prepend {
    box-shadow: none !important;
}

.el-menu {
    border-right: none !important;
    padding-bottom: 10px;
}

.el-sub-menu .el-icon svg {
    height: 0 !important;
}
.el-sub-menu__title {
    background-color: #ffffff;
}
.el-sub-menu .el-menu-item {
    border-radius: 8px;
    min-width: 0px !important;
    margin-left: 10px;
    margin-right: 10px;
}

.el-menu-item.is-active {
    border-radius: 8px;
    background-color: #ecf5ff;
    font-weight: bold;
    margin-left: 10px;
    margin-right: 10px;
}

.el-menu-item:hover {
    border-radius: 8px;
    margin-left: 10px;
    margin-right: 10px;
}
</style>