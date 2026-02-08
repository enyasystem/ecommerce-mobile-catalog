import React, { useState, useMemo } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Image,
	Dimensions,
	SafeAreaView,
	RefreshControl,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import FilterModal from '../components/FilterModal';
import { useRouter } from 'expo-router';

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
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [searchText, setSearchText] = useState('');
	const [showFilter, setShowFilter] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState<{
		categories: string[];
		sortBy: string;
		brands: string[];
		priceRange: [number, number];
	}>({
		categories: ['All'],
		sortBy: 'popularity',
		brands: [],
		priceRange: [50, 1200],
	});

	// Handle pull-to-refresh
	const onRefresh = async () => {
		setIsRefreshing(true);
		try {
			// Simulate API call with a 1 second delay
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// In a real app, you would fetch fresh product data here
			console.log('Products refreshed');
		} catch (error) {
			console.error('Error refreshing products:', error);
		} finally {
			setIsRefreshing(false);
		}
	};

	// Filter and sort products based on applied filters
	const filteredProducts = useMemo(() => {
		let result = [...products];

		// Filter by price range
		result = result.filter((p) => {
			const price = p.price;
			return price >= appliedFilters.priceRange[0] && price <= appliedFilters.priceRange[1];
		});

		// Filter by search text
		if (searchText.trim()) {
			const query = searchText.toLowerCase();
			result = result.filter((p) =>
				p.name.toLowerCase().includes(query)
			);
		}

		// Sort products
		switch (appliedFilters.sortBy) {
			case 'popularity':
				// Keep default order (already popular items first)
				break;
			case 'newest':
				// Sort with newest (isNew) first
				result.sort((a, b) => {
					if (a.isNew === b.isNew) return 0;
					return a.isNew ? -1 : 1;
				});
				break;
			case 'priceLowHigh':
				result.sort((a, b) => a.price - b.price);
				break;
			case 'priceHighLow':
				result.sort((a, b) => b.price - a.price);
				break;
		}

		return result;
	}, [appliedFilters, searchText]);

	const renderProductCard = ({ item }: { item: (typeof products)[0] }) => (
		<TouchableOpacity
			style={styles.productCard}
			activeOpacity={0.8}
			onPress={() => {
				router.push({
					pathname: '/product/[id]',
					params: {
						id: item.id,
						name: item.name,
						price: item.price,
						image: item.image,
						originalPrice: item.originalPrice || '',
					},
				});
			}}
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
			</View>

			{/* Product Info */}
			<Text style={styles.productName} numberOfLines={2}>
				{item.name}
			</Text>
			<View style={styles.productFooter}>
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
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* Sticky Header */}
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
				<TouchableOpacity
					style={{ borderRadius: 16 }}
					onPress={() => router.push('/(tabs)/search')}
					activeOpacity={0.7}
				>
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
							editable={false}
							onChangeText={setSearchText}
						/>
						<TouchableOpacity style={styles.micButton} onPress={() => router.push('/(tabs)/search')}>
							<MaterialCommunityIcons
								name="microphone"
								size={18}
								color="#fff"
							/>
						</TouchableOpacity>
					</BlurView>
				</TouchableOpacity>
			</View>

			<ScrollView 
				style={styles.scrollContent} 
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={onRefresh}
						tintColor="#2badee"
						titleColor="#2badee"
						title="Pull to refresh"
					/>
				}
			>
				{/* Categories Scroll */}
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.categoriesScroll}
					contentContainerStyle={styles.categoriesContent}
					nestedScrollEnabled={true}
				>
					{categories.map((category) => (
						<TouchableOpacity
							key={category}
							style={[
								styles.categoryBtn,
								selectedCategory === category && styles.categoryBtnActive,
							]}
							onPress={() => setSelectedCategory(category)}
						>
							<Text
								style={[
									styles.categoryText,
									selectedCategory === category && styles.categoryTextActive,
								]}
							>
								{category}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>

				{/* Results Count */}
				<View style={styles.resultsHeader}>
					<Text style={styles.resultsText}>
						Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
					</Text>
					{(appliedFilters.priceRange[0] !== 50 || appliedFilters.priceRange[1] !== 1200 || appliedFilters.sortBy !== 'popularity') && (
						<TouchableOpacity
							onPress={() => {
								setAppliedFilters({
									categories: ['All'],
									sortBy: 'popularity',
									brands: [],
									priceRange: [50, 1200],
								});
							}}
						>
							<Text style={styles.resetFiltersText}>Reset filters</Text>
						</TouchableOpacity>
					)}
				</View>

				{/* Products Grid */}
				<View style={styles.productsGrid}>
					{filteredProducts.length > 0 ? (
						filteredProducts.map((item) => (
							<View key={item.id} style={styles.gridColumn}>
								{renderProductCard({ item })}
							</View>
						))
					) : (
						<View style={styles.emptyStateContainer}>
							<MaterialCommunityIcons
								name="magnify"
								size={48}
								color="rgba(255, 255, 255, 0.3)"
								style={styles.emptyIcon}
							/>
							<Text style={styles.emptyText}>No products found</Text>
							<Text style={styles.emptySubtext}>
								Try adjusting your filters or search terms
							</Text>
						</View>
					)}
				</View>

				<View style={styles.spacer} />
			</ScrollView>

			{/* Filter FAB */}
			<TouchableOpacity style={styles.filterFab} onPress={() => setShowFilter(true)}>
				<MaterialCommunityIcons
					name="tune"
					size={20}
					color="#fff"
				/>
				<Text style={styles.filterFabText}>Filter</Text>
			</TouchableOpacity>

			{/* Filter Modal */}
			<FilterModal
				visible={showFilter}
				onClose={() => setShowFilter(false)}
				onApply={(filters) => {
					setAppliedFilters(filters);
					setShowFilter(false);
				}}
			/>
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
		zIndex: 10,
	},
	scrollContent: {
		flex: 1,
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
		height: 56,
		borderRadius: 28,
		backgroundColor: 'rgba(0,0,0,0.3)',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.1)',
	},
	searchInput: {
		flex: 1,
		marginLeft: 14,
		color: '#fff',
		fontSize: 15,
		fontWeight: '500',
	},
	micButton: {
		backgroundColor: 'rgba(255,255,255,0.15)',
		padding: 10,
		borderRadius: 14,
		marginLeft: 8,
	},
	categoriesScroll: {
		marginTop: 16,
		marginBottom: 12,
	},
	categoriesContent: {
		paddingHorizontal: 20,
		gap: 12,
	},
	categoryBtn: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		minHeight: 40,
		justifyContent: 'center',
	},
	categoryBtnActive: {
		backgroundColor: '#2b6cee',
		borderColor: '#2b6cee',
		shadowColor: '#2b6cee',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 8,
	},
	categoryText: {
		color: 'rgba(255, 255, 255, 0.6)',
		fontSize: 13,
		fontWeight: '600',
	},
	categoryTextActive: {
		color: '#fff',
		fontWeight: '700',
	},
	productsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 16,
		paddingTop: 12,
		paddingBottom: 20,
	},
	gridColumn: {
		width: '50%',
		paddingHorizontal: 8,
		marginBottom: 16,
	},
	gridRow: {
		justifyContent: 'space-between',
		marginBottom: 20,
		paddingHorizontal: 0,
		gap: 16,
	},
	productCard: {
		width: cardWidth,
		backgroundColor: '#111318',
		borderRadius: 24,
		padding: 12,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.08)',
		overflow: 'hidden',
		position: 'relative',
		paddingBottom: 20,
	},
	imageContainer: {
		width: '100%',
		aspectRatio: 4 / 5,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		position: 'relative',
		marginBottom: 12,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 16,
	},
	productImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	newBadge: {
		position: 'absolute',
		top: 8,
		left: 8,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		zIndex: 10,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	newBadgeText: {
		color: '#fff',
		fontSize: 10,
		fontWeight: '700',
		letterSpacing: 0.2,
	},
	favoriteButton: {
		position: 'absolute',
		top: 8,
		right: 8,
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10,
	},
	productName: {
		color: '#fff',
		fontSize: 13,
		fontWeight: '600',
		marginBottom: 8,
		lineHeight: 16,
	},
	productFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	originalPrice: {
		color: 'rgba(255, 255, 255, 0.4)',
		fontSize: 11,
		textDecorationLine: 'line-through',
		marginBottom: 2,
	},
	price: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
		letterSpacing: -0.3,
	},
	addButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#2b6cee',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#2b6cee',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.45,
		shadowRadius: 12,
		elevation: 8,
	},
	filterFab: {
		position: 'absolute',
		bottom: 180,
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
	spacer: {
		height: 120,
	},
	emptyStateContainer: {
		width: '100%',
		paddingVertical: 60,
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyIcon: {
		marginBottom: 16,
		opacity: 0.5,
	},
	emptyText: {
		fontSize: 18,
		fontWeight: '700',
		color: '#fff',
		marginBottom: 8,
		textAlign: 'center',
	},
	emptySubtext: {
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'center',
	},
	resultsHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 12,
		marginTop: 8,
	},
	resultsText: {
		fontSize: 14,
		fontWeight: '600',
		color: 'rgba(255, 255, 255, 0.7)',
	},
	resetFiltersText: {
		fontSize: 12,
		fontWeight: '700',
		color: '#2b6cee',
	},
});
