<template>
    <Loader v-if="isLoading"></Loader>

    <main class="a-landing-page" v-else>
        <h2>Dashboard</h2>
        <article class="statistics">
            <h3>Users</h3>
            <table>
                <thead>
                    <tr>
                        <th rowspan="2">Currently</th>
                        <th colspan="3">Registered</th>
                        <th colspan="3">Deleted</th>
                    </tr>
                    <tr>
                        <th>Today</th>
                        <th>This week</th>
                        <th>Overall</th>
                        <th>Today</th>
                        <th>This week</th>
                        <th>Overall</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="neutral">{{ usersCurrently }}</td>
                        <td class="positive">{{ usersRegisteredToday }}</td>
                        <td class="positive">{{ usersRegisteredThisWeek }}</td>
                        <td class="positive">{{ usersRegisteredOverall }}</td>
                        <td class="negative">{{ usersDeletedToday }}</td>
                        <td class="negative">{{ usersDeletedThisWeek }}</td>
                        <td class="negative">{{ usersDeletedOverall }}</td>
                    </tr>
                </tbody>
            </table>
        </article>

        <article class="statistics">
            <h3>Recipes</h3>
            <table>
                <thead>
                    <tr>
                        <th rowspan="2">Currently</th>
                        <th colspan="3">Created</th>
                        <th colspan="3">Deleted</th>
                    </tr>
                    <tr>
                        <th>Today</th>
                        <th>This week</th>
                        <th>Overall</th>
                        <th>Today</th>
                        <th>This week</th>
                        <th>Overall</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="neutral">{{ recipesCurrently }}</td>
                        <td class="positive">{{ recipesCreatedToday }}</td>
                        <td class="positive">{{ recipesCreatedThisWeek }}</td>
                        <td class="positive">{{ recipesCreatedOverall }}</td>
                        <td class="negative">{{ recipesDeletedToday }}</td>
                        <td class="negative">{{ recipesDeletedThisWeek }}</td>
                        <td class="negative">{{ recipesDeletedOverall }}</td>
                    </tr>
                </tbody>
            </table>
        </article>

        <article class="statistics">
            <h3>Reviews</h3>
            <table>
                <thead>
                    <tr>
                        <th rowspan="2">Currently</th>
                        <th colspan="3">Published</th>
                        <th colspan="3">Deleted</th>
                    </tr>
                    <tr>
                        <th>Today</th>
                        <th>This week</th>
                        <th>Overall</th>
                        <th>Today</th>
                        <th>This week</th>
                        <th>Overall</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="neutral">{{ reviewsCurrently }}</td>
                        <td class="positive">{{ reviewsPostedToday }}</td>
                        <td class="positive">{{ reviewsPostedThisWeek }}</td>
                        <td class="positive">{{ reviewsPostedOverall }}</td>
                        <td class="negative">{{ reviewsDeletedToday }}</td>
                        <td class="negative">{{ reviewsDeletedThisWeek }}</td>
                        <td class="negative">{{ reviewsDeletedOverall }}</td>
                    </tr>
                </tbody>
            </table>
        </article>
    </main>
</template>

<script>
import { getDashboard } from '../../services/adminService';
import { getTodaysRecords, getThisWeeksRecords } from '../../util/dateFilter';
import Loader from '../common/Loader.vue';
export default {
    data() {
        return {
            usersDashboard: {
                totalRegistered: [],
                totalDeleted: []
            },
            recipesDashboard: {
                totalCreated: [],
                totalDeleted: []
            },
            reviewsDashboard: {
                totalPosted: [],
                totalDeleted: []
            },
            isLoading: true
        };
    },
    async created() {
        try {
            const { usersDashboard, recipesDashboard, reviewsDashboard } = await getDashboard();
            this.usersDashboard = usersDashboard;
            this.recipesDashboard = recipesDashboard;
            this.reviewsDashboard = reviewsDashboard;
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            this.isLoading = false;
        }
    },
    computed: {
        usersCurrently() {
            return this.usersDashboard.totalRegistered.length - this.usersDashboard.totalDeleted.length;
        },
        usersRegisteredToday() {
            return getTodaysRecords(this.usersDashboard.totalRegistered).length;
        },
        usersRegisteredThisWeek() {
            return getThisWeeksRecords(this.usersDashboard.totalRegistered).length;
        },
        usersRegisteredOverall() {
            return this.usersDashboard.totalRegistered.length;
        },
        usersDeletedToday() {
            return getTodaysRecords(this.usersDashboard.totalDeleted).length;
        },
        usersDeletedThisWeek() {
            return getThisWeeksRecords(this.usersDashboard.totalDeleted).length;
        },
        usersDeletedOverall() {
            return this.usersDashboard.totalDeleted.length;
        },
        recipesCurrently() {
            return this.recipesDashboard.totalCreated.length - this.recipesDashboard.totalDeleted.length;
        },
        recipesCreatedToday() {
            return getTodaysRecords(this.recipesDashboard.totalCreated).length;
        },
        recipesCreatedThisWeek() {
            return getThisWeeksRecords(this.recipesDashboard.totalCreated).length;
        },
        recipesCreatedOverall() {
            return this.recipesDashboard.totalCreated.length;
        },
        recipesDeletedToday() {
            return getTodaysRecords(this.recipesDashboard.totalDeleted).length;
        },
        recipesDeletedThisWeek() {
            return getThisWeeksRecords(this.recipesDashboard.totalDeleted).length;
        },
        recipesDeletedOverall() {
            return this.recipesDashboard.totalDeleted.length;
        },
        reviewsCurrently() {
            return this.reviewsDashboard.totalPosted.length - this.reviewsDashboard.totalDeleted.length;
        },
        reviewsPostedToday() {
            return getTodaysRecords(this.reviewsDashboard.totalPosted).length;
        },
        reviewsPostedThisWeek() {
            return getThisWeeksRecords(this.reviewsDashboard.totalPosted).length;
        },
        reviewsPostedOverall() {
            return this.reviewsDashboard.totalPosted.length;
        },
        reviewsDeletedToday() {
            return getTodaysRecords(this.reviewsDashboard.totalDeleted).length;
        },
        reviewsDeletedThisWeek() {
            return getThisWeeksRecords(this.reviewsDashboard.totalDeleted).length;
        },
        reviewsDeletedOverall() {
            return this.reviewsDashboard.totalDeleted.length;
        },
    },
    components: { Loader }
}
</script>