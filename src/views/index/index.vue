<template>
	<div id="index">
		<!-- <el-button v-on:click="Strore">Store</el-button> -->
		<div class="block">
			<div class="container">
				<h1 style="text-align: center; color: #409EFF;">公告板</h1>
				<el-divider content-position="right">
					<el-popover v-if="role" placement="top-start" width="150" trigger="hover">
						<div><i class="el-icon-circle-plus" style="color: #67C23A;"></i><span style="margin-left: 5px;">可更新公告。</span></div>
						<el-button slot="reference" type="primary" size="mini" icon="el-icon-plus" circle autofocus @click="showDialog=true"></el-button>
					</el-popover>
				</el-divider>
				<el-timeline v-if="reload">
					<el-timeline-item v-for="(ann, idx) in anncs" :key="idx" :timestamp="ann.createTime.trim().split(/\s+/)[0]"
						placement="top" :color="nodeColor">
						<el-card>
							<div slot="header" class="clearfix">
								<span>{{ann.title}}</span>
								<el-popconfirm v-if="role" @onConfirm="DelAnnc(ann.aid)" confirmButtonText='确定' cancelButtonText='取消' icon="el-icon-info"
									iconColor="red" title="确定删除该公告吗？" confirmButtonType="danger">
									<el-button slot="reference" style="float: right; padding: 3px 0" type="text"><i class="el-icon-close" style="color: #F56C6C;"></i></el-button>
								</el-popconfirm>
							</div>
							<h4>{{ann.body}}</h4>
							<p style="float: right; font-size: 12px; color: #8F8F8F;">管理员 发布于: {{ann.createTime}}</p>
						</el-card>
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
		<!-- Add annc Dialog -->
		<el-dialog center title="更新公告" :visible.sync="showDialog" width="30%" :before-close="handleClose">
			<el-form label-position='left' label-width="120px">

				<el-form-item label="题目">
					<el-input v-model="title" placeholder="请输入标题"></el-input>
				</el-form-item>

				<el-form-item label="描述" placeholder="请编辑公告内容">
					<el-input type="textarea" v-model="body"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="Submit">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import {
		GetAnnouncements,
		AddAnnouncement,
		DelAnnouncement
	} from '@/api/api.js'
	export default {
		name: 'index',
		data: () => {
			return {
				showDialog: false,
				nodeColor: "#409EFF",
				anncs: [],
				reload: true,
				// 公告数据
				title: '',
				body: ''
			}
		},
		methods: {
			InitAnnc: async function() {
				try {
					let rsp = await GetAnnouncements(this);
					this.anncs = rsp.data.anncs;
					this.reload = false;
					this.$nextTick(() => {
						this.reload = true
					})
				} catch (e) {
					//TODO handle the exception
					this.$message({
						type: 'error',
						message: '获取数据失败,请检查网络!'
					});
				}
			},
			DelAnnc: async function(aid) {
				let rsp = await DelAnnouncement(this, {
					'aid': aid,
					'user': this.$store.state.user
				});
				this.$message({
					type: 'warning',
					message: '已删除'
				});
				this.InitAnnc();
			},
			handleClose: function() {
				this.$confirm('此操作将不会放弃当前已编辑内容!!!', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.showDialog = false;
					this.$message({
						type: 'info',
						message: '放弃编辑公告!'
					});
				})
			},
			Submit: async function() {
				let rsp = await AddAnnouncement(this, {
					'title': this.title,
					'body': this.body,
					'user': this.$store.state.user,
				})
				this.showDialog = false;
				switch (rsp.data.code) {
					case 200:
						this.$message({
							type: 'success',
							message: '更新公告成功!'
						});
						this.InitAnnc()
						break;
					case 500:
						this.$message({
							type: 'error',
							message: 'token已失效,请重新登录!'
						});
						this.$store.state.user = {};
						break;
					default:
						this.$message({
							type: 'error',
							message: '更新公告失败!'
						});
						break;
				}
			}
		},
		computed: {
			role: function() {
				return this.$store.state.user.role
			}
		},
		created: function() {
			this.InitAnnc();
		}
	}
</script>

<style scoped>
	.container {
		margin: 0 auto;
		max-width: 45%;
	}
</style>
