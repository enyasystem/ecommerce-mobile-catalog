import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Image,
	FlatList,
	Dimensions,
	SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 16;

const categories = ['All', 'Audio', 'Wearables', 'Smart Home', 'Photography'];

const products = [
	{
		id: '1',
		name: 'Nexus Pro Wireless ANC',
		price: 299,
		originalPrice: 349,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAyo8s8cOPxPs6GHiMbibuJRx5UhsJiRrngtKHQeQFaftfKR99R2KsMHcHJr9z9eT-QS6bTxegIVBdf-hDM6LmyYUcq2AzNyZoB9EaBHYSQploxk3kzl4ohwdWzALuORD4IRTLAreA3XsO6QfI-hiYiKJaD6xqByB8_QKUm0wCxmo_RlEMzmFq25Nxj6wOKaJyNJT-bjC1n5dcjYX4d2p3Vgk8dELElkXTlsuDHeEA9qcffvOkIHEfE3BpQaTOt3HoNDCIsmYGm0pG',
		isFavorite: false,
		isNew: false,
	},
	{
		id: '2',
		name: 'Chronos Watch Series 7',
		price: 450,
		originalPrice: null,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuyyvebdBAFwlc6KaxcJ5UUhJCX5alLjYaWzfYv2QVQZ9JBtuyxATp73vBP4zA28RTMnudbTMZL-tTyxZH_zSKeDeZsza2MCksQ0V1MVE0wycI32naSQsV1m6qQkj30UgHwlz2KWSC9u9uNZkjKmfpfhPL2NwwE3hvSs5Is6l9iwzKmXFjcO6vRuYlaY1ZkHUHK8F44M844QPB9k-GLZ9EObNjq5Atr661Ne8EkFpfTIeMRJfp4shPMsl1oVcj2K26yomItp-JQsEr',
		isFavorite: false,
		isNew: true,
	},
	{
		id: '3',
		name: 'Lumina Lens 85mm f/1.4',
		price: 899,
		originalPrice: null,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAxRKJShrmA1IaPgjsQpGZ9YZpkLcBQU18TA2OQVazGIF9ijjhTUKqHf1IEYM6_d4blJtlpcbJYzAOLxhnq9dpauoGGxokE559Vbav9kLIFdK_lKYCZk-nKooTaC6eswc5ii33yNOD-Py4BZmBuKHOQ3twGsOEM1ShioQhcpMUGB68UcJknaKN5EbzJ5v0E7ugxkxM9-fcstBhfdvsaYA6yD_9Ht9qyQLDXnvyh9b0zzq4yiOqLcBRNOpU4AB0-OnlKrlRYUGhIpPE',
		isFavorite: false,
		isNew: false,
	},
	{
		id: '4',
		name: 'CyberMouse X1 Elite',
		price: 99,
		originalPrice: 120,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa3ZvDJ0LK5F3IdCoaMngueykmcGgl4bMHNnk17Bn279dr2sJoibpkBV1_zCnhFj0XJGgnkUIQ9DZwY2SL87SV1Lma4yEVW3uPFf_OhVgns6yAT5pRyCtw5GCc2sUkLf_e2rMeXDOB-Ik2MYxj5ROxZGo8_QMHke3dYf8Z47xDibjuTPLRp-V41lOJ7i8OZdyzYSMmke_iKay9Et3QaJZJ7SFm2f4eiczY967TfcJCLLElLmo0Z97dddJiycQzN4U5x7h-rZflmp9a',
		isFavorite: true,
		isNew: false,
	},
];

export default function BrowseScreen() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [searchText, setSearchText] = useState('');

	const renderProductCard = ({ item }: { item: (typeof products)[0] }) => (
		<TouchableOpacity
			style={styles.productCard}
			activeOpacity={0.8}
		>
			{/* Product Image */}
			<View style={styles.imageContainer}>
				{item.isNew && (
					<View style={styles.newBadge}>
						<Text style={styles.newBadgeText}>NEW</Text>
					</View>
				)}
				<TouchableOpacity style={styles.favoriteButton}>
					<MaterialCommunityIcons
						name={item.isFavorite ? 'heart' : 'heart-outline'}
						size={20}
						color={item.isFavorite ? '#2b6cee' : 'rgba(255,255,255,0.7)'}
					/>
				</TouchableOpacity>
				<Image
					source={{ uri: item.image }}
					style={styles.productImage}
				/>
				<View style={styles.imageInnerBorder} />
			</View>

			{/* Product Info */}
			<View style={styles.productInfo}>
				<Text style={styles.productName} numberOfLines={2}>
					{item.name}
				</Text>
				<View style={styles.priceRow}>
					<View>
						{item.originalPrice && (
							<Text style={styles.originalPrice}>
								${item.originalPrice}
							</Text>
						)}
						<Text style={styles.price}>${item.price}</Text>
					</View>
					<TouchableOpacity style={styles.addButton}>
						<MaterialCommunityIcons
							name="plus"
							size={18}
							color="#fff"
						/>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.headerContent}>
					<View style={styles.logoContainer}>
						<MaterialCommunityIcons
							name="cube"
							size={28}
							color="#2b6cee"
						/>
						<Text style={styles.logoText}>NexusStore</Text>
					</View>
					<TouchableOpacity style={styles.notificationButton}>
						<MaterialCommunityIcons
							name="bell"
							size={24}
							color="rgba(255,255,255,0.9)"
						/>
						<View style={styles.notificationBadge} />
					</TouchableOpacity>
				</View>

				{/* Search Bar */}
				<BlurView intensity={40} style={styles.searchContainer}>
					<MaterialCommunityIcons
						name="magnify"
						size={20}
						color="rgba(255,255,255,0.5)"
					/>
					<TextInput
						placeholder="Search for premium gear..."
						placeholderTextColor="rgba(255,255,255,0.4)"
						style={styles.searchInput}
						value={searchText}
						onChangeText={setSearchText}
					/>
					<TouchableOpacity style={styles.micButton}>
						<MaterialCommunityIcons
							name="microphone"
							size={18}
							color="#fff"
						/>
					</TouchableOpacity>
				</BlurView>
			</View>

			{/* Categories Scroll */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.categoriesScroll}
				contentContainerStyle={styles.categoriesContent}
			>
				{categories.map((category) => (
					<TouchableOpacity
						key={category}
						style={[
							styles.categoryButton,
							selectedCategory === category
								? styles.categoryButtonActive
								: styles.categoryButtonInactive,
							{ marginRight: 12 },
						]}
						onPress={() => setSelectedCategory(category)}
					>
						<Text
							style={[
								styles.categoryText,
								selectedCategory === category
									? styles.categoryTextActive
									: styles.categoryTextInactive,
							]}
						>
							{category}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			{/* Products Grid */}
			<FlatList
				data={products}
				renderItem={renderProductCard}
				keyExtractor={(item) => item.id}
				numColumns={2}
				columnWrapperStyle={styles.gridRow}
				scrollEnabled={true}
				contentContainerStyle={styles.productsGrid}
			/>

			{/* Filter FAB */}
			<TouchableOpacity style={styles.filterFab}>
				<MaterialCommunityIcons
					name="tune"
					size={20}
					color="#fff"
				/>
				<Text style={styles.filterFabText}>Filter</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#050505',
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 16,
		backgroundColor: 'rgba(5,5,5,0.8)',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255,255,255,0.05)',
	},
	headerContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	logoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	logoText: {
		fontSize: 20,
		fontWeight: '700',
		color: '#fff',
	},
	notificationButton: {
		padding: 8,
		position: 'relative',
	},
	notificationBadge: {
		position: 'absolute',
		top: 8,
		right: 8,
		width: 8,
		height: 8,
		backgroundColor: '#ff4444',
		borderRadius: 4,
		borderWidth: 2,
		borderColor: '#050505',
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		height: 48,
		borderRadius: 24,
		backgroundColor: 'rgba(255,255,255,0.08)',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.15)',
	},
	searchInput: {
		flex: 1,
		marginLeft: 12,
		color: '#fff',
		fontSize: 14,
		fontWeight: '500',
	},
	micButton: {
		backgroundColor: 'rgba(255,255,255,0.1)',
		padding: 6,
		borderRadius: 12,
		marginLeft: 8,
	},
	categoriesScroll: {
		paddingVertical: 16,
		paddingHorizontal: 20,
	},
	categoriesContent: {
		paddingRight: 20,
	},
	categoryButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		borderWidth: 0,
	},
	categoryButtonActive: {
		backgroundColor: '#2b6cee',
		shadowColor: '#2b6cee',
		shadowOpacity: 0.25,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		elevation: 6,
	},
	categoryButtonInactive: {
		backgroundColor: 'rgba(255,255,255,0.08)',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.1)',
	},
	categoryText: {
		fontSize: 14,
		fontWeight: '600',
	},
	categoryTextActive: {
		color: '#fff',
	},
	categoryTextInactive: {
		color: 'rgba(255,255,255,0.8)',
	},
	productsGrid: {
		paddingHorizontal: 16,
		paddingBottom: 180,
	},
	gridRow: {
		justifyContent: 'space-between',
		marginBottom: 20,
		paddingHorizontal: 0,
		gap: 16,
	},
	productCard: {
		width: cardWidth,
		borderRadius: 20,
		overflow: 'hidden',
		backgroundColor: '#111318',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.05)',
	},
	imageContainer: {
		width: '100%',
		aspectRatio: 4 / 5,
		backgroundColor: 'rgba(0,0,0,0.2)',
		position: 'relative',
		marginBottom: 12,
	},
	productImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	imageInnerBorder: {
		position: 'absolute',
		inset: 0,
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.1)',
		borderRadius: 12,
	},
	newBadge: {
		position: 'absolute',
		top: 8,
		left: 8,
		backgroundColor: 'rgba(255,255,255,0.1)',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.1)',
		zIndex: 10,
	},
	newBadgeText: {
		fontSize: 10,
		fontWeight: '700',
		color: '#fff',
	},
	favoriteButton: {
		position: 'absolute',
		top: 8,
		right: 8,
		zIndex: 10,
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 20,
		padding: 6,
	},
	productInfo: {
		paddingHorizontal: 12,
		paddingBottom: 12,
	},
	productName: {
		fontSize: 14,
		fontWeight: '600',
		color: '#fff',
		lineHeight: 18,
		marginBottom: 8,
	},
	priceRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginTop: 8,
	},
	originalPrice: {
		fontSize: 12,
		color: 'rgba(255,255,255,0.4)',
		textDecorationLine: 'line-through',
	},
	price: {
		fontSize: 16,
		fontWeight: '700',
		color: '#fff',
	},
	addButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: '#2b6cee',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#2b6cee',
		shadowOpacity: 0.3,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		elevation: 6,
	},
	filterFab: {
		position: 'absolute',
		bottom: 100,
		right: 16,
		backgroundColor: '#2b6cee',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 24,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		shadowColor: '#2b6cee',
		shadowOpacity: 0.3,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 6 },
		elevation: 8,
	},
	filterFabText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 14,
	},
});
