import { getCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router';
import { onMounted } from 'vue';
import { ref } from 'vue'

//封装分类数据业务相关代码
export function useCategory() {
    //获取数据
    const categoryData = ref({})
    const route = useRoute()

    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => getCategory())

    //目标：路由参数变化的时候，可以把分类接口重新发送
    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })
    return {
        categoryData
    }
}

