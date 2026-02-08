import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Image,
	Dimensions,
	FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../features/products/productsAPI';
import { addToCart } from '../../features/cart/cartSlice';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';
import ProductSkeleton from '../../components/products/ProductSkeleton';

const { width } = Dimensions.get('window');
const cardWidth = width - 40;

const categories = ['All', 'electronics', "men's clothing", "women's clothing", 'jewelery'];
const trendingTopics = [
	{ id: '1', name: 'Cyberpunk Aesthetics', icon: 'trending-up', color: '#2badee' },
	{ id: '2', name: 'Fast Chargers', icon: 'lightning-bolt', color: '#10b981' },
	{ id: '3', name: 'Limited Drops', icon: 'fire', color: '#f97316' },
];

export default function SearchScreen() {
	const router = useRouter();
	const dispatch = useDispatch();
	const favoriteIds = useSelector((state: any) =>
		state.favorites.items.map((item: any) => item.id)
	);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [recentSearches, setRecentSearches] = useState<string[]>([]);
	const [showResults, setShowResults] = useState(false);
	const [error, setError] = useState<{ type: string; message: string } | null>(null);

	// Fetch products from FakeStore API
	const { data: apiProducts = [], isLoading, error: apiError } = useGetProductsQuery();

	// Transform API products to UI format
	const products = useMemo(() => {
		return apiProducts.map((product) => ({
			id: product.id.toString(),
			name: product.title,
			price: Math.round(product.price),
			originalPrice: null,
			image: product.image,
			isFavorite: false,
			isNew: false,
			category: product.category,
		}));
	}, [apiProducts]);

	// Load recent searches on mount
	useEffect(() => {
		loadRecentSearches();
	}, []);

	const loadRecentSearches = async () => {
		try {
			setError(null);
			const stored = await AsyncStorage.getItem('recentSearches');
			if (stored) {
				setRecentSearches(JSON.parse(stored));
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to load recent searches';
			setError({
				type: 'load_error',
				message: errorMessage,
			});
			console.error('Error loading recent searches:', error);
		}
	};

	const saveRecentSearch = useCallback(async (query: string) => {
		try {
			setError(null);
			const trimmedQuery = query.trim();
			if (!trimmedQuery) return;

			let updated = [trimmedQuery, ...recentSearches.filter((s) => s !== trimmedQuery)].slice(0, 10);
			setRecentSearches(updated);
			await AsyncStorage.setItem('recentSearches', JSON.stringify(updated));
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to save search';
			setError({
				type: 'save_error',
				message: errorMessage,
			});
			console.error('Error saving search:', error);
		}
	}, [recentSearches]);

	const clearRecentSearches = async () => {
		try {
			setError(null);
			setRecentSearches([]);
			await AsyncStorage.removeItem('recentSearches');
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to clear searches';
			setError({
				type: 'clear_error',
				message: errorMessage,
			});
			console.error('Error clearing searches:', error);
		}
	};

	const handleRetry = () => {
		setError(null);
		loadRecentSearches();
	};

	// Filter products based on search query and category
	const filteredProducts = useMemo(() => {
		let result = [...products];

		// Filter by category
		if (selectedCategory !== 'All') {
			result = result.filter((p) => p.category === selectedCategory);
		}

		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter((p) => p.name.toLowerCase().includes(query));
		}

		return result;
	}, [searchQuery, selectedCategory, products]);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		if (query.trim()) {
			setShowResults(true);
		} else {
			setShowResults(false);
		}
	};

	const handleSearchSubmit = () => {
		if (searchQuery.trim()) {
			saveRecentSearch(searchQuery);
			setShowResults(true);
		}
	};

	const handleRecentSearchTap = (query: string) => {
		setSearchQuery(query);
		setShowResults(true);
	};

	const renderProductCard = (item: (typeof products)[0]) => (
		<TouchableOpacity
			style={styles.productCardContainer}
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
			<View style={styles.productCardRow}>
				{/* Image */}
				<View style={styles.productImageContainer}>
					{item.isNew && (
						<View style={styles.newBadge}>
							<Text style={styles.newBadgeText}>NEW</Text>
						</View>
					)}
					{item.originalPrice && (
						<View style={styles.saleBadge}>
							<Text style={styles.saleBadgeText}>SALE</Text>
						</View>
					)}
					<TouchableOpacity
						style={styles.favoriteButton}
						onPress={() =>
							dispatch(
								toggleFavorite({
									id: item.id,
									name: item.name,
									price: item.price,
									image: item.image,
									category: item.category,
								})
							)
						}
						activeOpacity={0.6}
					>
						<MaterialCommunityIcons
							name={favoriteIds.includes(item.id) ? 'heart' : 'heart-outline'}
							size={18}
							color="#2b6cee"
						/>
					</TouchableOpacity>
					<Image source={{ uri: item.image }} style={styles.productImage} />
				</View>

				{/* Info */}
				<View style={styles.productInfo}>
					<View>
						<Text style={styles.productName} numberOfLines={2}>
							{item.name}
						</Text>
						<Text style={styles.productDescription} numberOfLines={1}>
							Premium quality product
						</Text>
					</View>

					<View style={styles.priceContainer}>
						<View>
							{item.originalPrice ? (
								<Text style={styles.originalPrice}>${(item.originalPrice as number).toFixed(2)}</Text>
							) : null}
							<Text style={styles.price}>${item.price}</Text>
						</View>
						<TouchableOpacity
							style={styles.addButton}
							onPress={() =>
								dispatch(
									addToCart({
										id: item.id,
										name: item.name,
										price: item.price,
										image: item.image,
									})
								)
							}
							activeOpacity={0.7}
						>
							<MaterialCommunityIcons
								name="plus"
								size={18}
								color="#fff"
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* Search Header */}
			<BlurView intensity={40} style={styles.headerBlur}>
				<View style={styles.header}>
					<View style={styles.searchInputContainer}>
						<MaterialCommunityIcons
							name="magnify"
							size={20}
							color="rgba(255,255,255,0.5)"
						/>
						<TextInput
							placeholder="Search products..."
							placeholderTextColor="rgba(255,255,255,0.4)"
							style={styles.searchInput}
							value={searchQuery}
							onChangeText={handleSearch}
							onSubmitEditing={handleSearchSubmit}
							returnKeyType="search"
						/>
						{searchQuery.length > 0 && (
							<TouchableOpacity onPress={() => handleSearch('')}>
								<MaterialCommunityIcons
									name="close"
									size={20}
									color="rgba(255,255,255,0.7)"
								/>
							</TouchableOpacity>
						)}
					</View>
					<TouchableOpacity onPress={() => handleSearch('')}>
						<Text style={styles.cancelButton}>Cancel</Text>
					</TouchableOpacity>
				</View>

				{/* Category Filter Chips */}
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.categoriesScroll}
					contentContainerStyle={styles.categoriesContent}
				>
					{categories.map((cat) => (
						<TouchableOpacity
							key={cat}
							style={[
								styles.categoryChip,
								selectedCategory === cat && styles.categoryChipActive,
							]}
							onPress={() => setSelectedCategory(cat)}
						>
							<Text
								style={[
									styles.categoryChipText,
									selectedCategory === cat && styles.categoryChipTextActive,
								]}
							>
								{cat}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</BlurView>

			{/* Content */}
			<ScrollView
				style={styles.content}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.contentContainer}
			>
				{/* Error State */}
				{error && (
					<View style={styles.errorContainer}>
						<View style={styles.errorContent}>
							<MaterialCommunityIcons
								name="alert-circle"
								size={48}
								color="#ef4444"
								style={styles.errorIcon}
							/>
							<Text style={styles.errorTitle}>Unable to load</Text>
							<Text style={styles.errorMessage}>{error.message}</Text>
							<TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
								<MaterialCommunityIcons name="refresh" size={18} color="#fff" />
								<Text style={styles.retryButtonText}>Retry</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}

				{!error && 
					(showResults ? (
						// Search Results
						<View style={styles.resultsSection}>
							<Text style={styles.resultsTitle}>
								Results for "{searchQuery}" ({filteredProducts.length})
							</Text>
							{isLoading ? (
								// Show skeleton loaders while loading
								<View style={styles.productsList}>
									{Array.from({ length: 3 }).map((_, index) => (
										<View key={`skeleton-${index}`}>
											<ProductSkeleton />
										</View>
									))}
								</View>
							) : filteredProducts.length > 0 ? (
								<View style={styles.productsList}>
									{filteredProducts.map((item) => (
										<View key={item.id}>
											{renderProductCard(item)}
										</View>
									))}
								</View>
							) : (
								<View style={styles.emptyState}>
									<MaterialCommunityIcons
										name="magnify"
										size={48}
										color="rgba(255,255,255,0.2)"
									/>
									<Text style={styles.emptyStateText}>No results found</Text>
									<Text style={styles.emptyStateSubtext}>
										Try different keywords or categories
									</Text>
								</View>
							)}
						</View>
					) : (
						<>
							{/* Recent Searches */}
							{recentSearches.length > 0 && (
								<View style={styles.section}>
									<View style={styles.sectionHeader}>
										<Text style={styles.sectionTitle}>RECENT</Text>
										<TouchableOpacity onPress={clearRecentSearches}>
											<Text style={styles.sectionAction}>Clear All</Text>
										</TouchableOpacity>
									</View>
									<View style={styles.recentList}>
										{recentSearches.map((search, index) => (
											<TouchableOpacity
												key={index}
												style={styles.recentItem}
												onPress={() => handleRecentSearchTap(search)}
											>
												<View style={styles.recentIconContainer}>
													<MaterialCommunityIcons
														name="history"
														size={18}
														color="rgba(255,255,255,0.6)"
													/>
												</View>
												<Text style={styles.recentText}>{search}</Text>
												<MaterialCommunityIcons
													name="arrow-top-left"
													size={18}
													color="rgba(255,255,255,0.4)"
												/>
											</TouchableOpacity>
										))}
									</View>
								</View>
							)}

							{/* Trending Now */}
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>TRENDING NOW</Text>
								<View style={styles.trendingGrid}>
									{trendingTopics.map((topic) => (
										<TouchableOpacity key={topic.id} style={styles.trendingCard}>
											<View
												style={[
													styles.trendingIcon,
													{ backgroundColor: topic.color + '20' },
												]}
											>
												<MaterialCommunityIcons
													name={topic.icon as any}
													size={18}
													color={topic.color}
												/>
											</View>
											<Text style={styles.trendingText}>{topic.name}</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>
						</>
					))
				}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#050505',
	},
	headerBlur: {
		paddingHorizontal: 16,
		paddingTop: 12,
		paddingBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255,255,255,0.05)',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 12,
	},
	searchInputContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: 'rgba(255,255,255,0.08)',
		borderRadius: 24,
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.1)',
		gap: 8,
	},
	searchInput: {
		flex: 1,
		color: '#fff',
		fontSize: 16,
		fontWeight: '500',
	},
	cancelButton: {
		color: 'rgba(255,255,255,0.6)',
		fontSize: 14,
		fontWeight: '500',
	},
	categoriesScroll: {
		marginBottom: 8,
	},
	categoriesContent: {
		paddingHorizontal: 0,
		gap: 8,
	},
	categoryChip: {
		paddingHorizontal: 14,
		paddingVertical: 6,
		borderRadius: 16,
		backgroundColor: 'rgba(255,255,255,0.08)',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.1)',
	},
	categoryChipActive: {
		backgroundColor: '#2badee',
		borderColor: '#2badee',
	},
	categoryChipText: {
		color: 'rgba(255,255,255,0.6)',
		fontSize: 12,
		fontWeight: '600',
	},
	categoryChipTextActive: {
		color: '#fff',
	},
	content: {
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 32,
	},
	resultsSection: {
		flex: 1,
	},
	resultsTitle: {
		color: 'rgba(255,255,255,0.6)',
		fontSize: 12,
		fontWeight: '600',
		textTransform: 'uppercase',
		marginBottom: 16,
		letterSpacing: 0.5,
	},
	productsList: {
		gap: 12,
	},
	productCardContainer: {
		marginBottom: 8,
	},
	productCardRow: {
		flexDirection: 'row',
		gap: 12,
		padding: 8,
		paddingRight: 16,
		borderRadius: 32,
		backgroundColor: '#101015',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.08)',
	},
	productImageContainer: {
		width: 96,
		height: 96,
		borderRadius: 24,
		overflow: 'hidden',
		backgroundColor: '#1a1a1f',
		position: 'relative',
	},
	productImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	favoriteButton: {
		position: 'absolute',
		top: 8,
		right: 8,
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
	},
	newBadge: {
		position: 'absolute',
		top: 8,
		left: 8,
		zIndex: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
		backgroundColor: 'rgba(0,0,0,0.6)',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.1)',
	},
	newBadgeText: {
		color: '#fff',
		fontSize: 9,
		fontWeight: '700',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	saleBadge: {
		position: 'absolute',
		top: 8,
		left: 8,
		zIndex: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
		backgroundColor: 'rgba(239, 68, 68, 0.8)',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.1)',
	},
	saleBadgeText: {
		color: '#fff',
		fontSize: 9,
		fontWeight: '700',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	productInfo: {
		flex: 1,
		justifyContent: 'space-between',
		paddingVertical: 4,
	},
	productName: {
		color: '#fff',
		fontSize: 15,
		fontWeight: '600',
		marginBottom: 4,
	},
	productDescription: {
		color: 'rgba(255,255,255,0.5)',
		fontSize: 12,
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	price: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	originalPrice: {
		color: 'rgba(255,255,255,0.4)',
		fontSize: 11,
		textDecorationLine: 'line-through',
		marginBottom: 2,
	},
	addButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: '#2badee',
		justifyContent: 'center',
		alignItems: 'center',
	},
	section: {
		marginBottom: 28,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	sectionTitle: {
		color: 'rgba(255,255,255,0.5)',
		fontSize: 11,
		fontWeight: '600',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	sectionAction: {
		color: '#2badee',
		fontSize: 12,
		fontWeight: '500',
	},
	recentList: {
		gap: 0,
	},
	recentItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 24,
		marginBottom: 4,
		backgroundColor: 'rgba(255,255,255,0.02)',
		borderWidth: 1,
		borderColor: 'transparent',
		gap: 12,
	},
	recentItemHovered: {
		backgroundColor: 'rgba(255,255,255,0.08)',
		borderColor: 'rgba(255,255,255,0.1)',
	},
	recentIconContainer: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: 'rgba(255,255,255,0.08)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	recentText: {
		flex: 1,
		color: '#fff',
		fontSize: 14,
		fontWeight: '500',
	},
	trendingGrid: {
		flexDirection: 'row',
		gap: 12,
		flexWrap: 'wrap',
	},
	trendingCard: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: 'rgba(255,255,255,0.05)',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.08)',
		gap: 8,
	},
	trendingIcon: {
		width: 24,
		height: 24,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	trendingText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: '500',
	},
	emptyState: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 60,
	},
	emptyStateText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
		marginTop: 12,
	},
	emptyStateSubtext: {
		color: 'rgba(255,255,255,0.5)',
		fontSize: 13,
		marginTop: 4,
	},
	errorContainer: {
		width: '100%',
		paddingHorizontal: 16,
		paddingVertical: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	errorContent: {
		width: '100%',
		borderRadius: 20,
		padding: 24,
		backgroundColor: 'rgba(239, 68, 68, 0.1)',
		borderWidth: 1,
		borderColor: 'rgba(239, 68, 68, 0.3)',
		alignItems: 'center',
	},
	errorIcon: {
		marginBottom: 16,
	},
	errorTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#fff',
		marginBottom: 8,
		textAlign: 'center',
	},
	errorMessage: {
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.6)',
		textAlign: 'center',
		marginBottom: 20,
		lineHeight: 20,
	},
	retryButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingVertical: 12,
		backgroundColor: '#ef4444',
		borderRadius: 12,
		gap: 8,
	},
	retryButtonText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '600',
	},
});
