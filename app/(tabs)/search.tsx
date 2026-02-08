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
	SafeAreaView,
	FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const cardWidth = width - 40;

// Product data - shared with browse screen
const products = [
	{
		id: '1',
		name: 'Nexus Pro Wireless ANC',
		price: 299,
		originalPrice: 349,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAyo8s8cOPxPs6GHiMbibuJRx5UhsJiRrngtKHQeQFaftfKR99R2KsMHcHJr9z9eT-QS6bTxegIVBdf-hDM6LmyYUcq2AzNyZoB9EaBHYSQploxk3kzl4ohwdWzALuORD4IRTLAreA3XsO6QfI-hiYiKJaD6xqByB8_QKUm0wCxmo_RlEMzmFq25Nxj6wOKaJyNJT-bjC1n5dcjYX4d2p3Vgk8dELElkXTlsuDHeEA9qcffvOkIHEfE3BpQaTOt3HoNDCIsmYGm0pG',
		isFavorite: false,
		isNew: false,
		category: 'Audio',
	},
	{
		id: '2',
		name: 'Chronos Watch Series 7',
		price: 450,
		originalPrice: null,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuyyvebdBAFwlc6KaxcJ5UUhJCX5alLjYaWzfYv2QVQZ9JBtuyxATp73vBP4zA28RTMnudbTMZL-tTyxZH_zSKeDeZsza2MCksQ0V1MVE0wycI32naSQsV1m6qQkj30UgHwlz2KWSC9u9uNZkjKmfpfhPL2NwwE3hvSs5Is6l9iwzKmXFjcO6vRuYlaY1ZkHUHK8F44M844QPB9k-GLZ9EObNjq5Atr661Ne8EkFpfTIeMRJfp4shPMsl1oVcj2K26yomItp-JQsEr',
		isFavorite: false,
		isNew: true,
		category: 'Wearables',
	},
	{
		id: '3',
		name: 'Lumina Lens 85mm f/1.4',
		price: 899,
		originalPrice: null,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAxRKJShrmA1IaPgjsQpGZ9YZpkLcBQU18TA2OQVazGIF9ijjhTUKqHf1IEYM6_d4blJtlpcbJYzAOLxhnq9dpauoGGxokE559Vbav9kLIFdK_lKYCZk-nKooTaC6eswc5ii33yNOD-Py4BZmBuKHOQ3twGsOEM1ShioQhcpMUGB68UcJknaKN5EbzJ5v0E7ugxkxM9-fcstBhfdvsaYA6yD_9Ht9qyQLDXnvyh9b0zzq4yiOqLcBRNOpU4AB0-OnlKrlRYUGhIpPE',
		isFavorite: false,
		isNew: false,
		category: 'Photography',
	},
	{
		id: '4',
		name: 'CyberMouse X1 Elite',
		price: 99,
		originalPrice: 120,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa3ZvDJ0LK5F3IdCoaMngueykmcGgl4bMHNnk17Bn279dr2sJoibpkBV1_zCnhFj0XJGgnkUIQ9DZwY2SL87SV1Lma4yEVW3uPFf_OhVgns6yAT5pRyCtw5GCc2sUkLf_e2rMeXDOB-Ik2MYxj5ROxZGo8_QMHke3dYf8Z47xDibjuTPLRp-V41lOJ7i8OZdyzYSMmke_iKay9Et3QaJZJ7SFm2f4eiczY967TfcJCLLElLmo0Z97dddJiycQzN4U5x7h-rZflmp9a',
		isFavorite: true,
		isNew: false,
		category: 'Audio',
	},
	{
		id: '5',
		name: 'Sony WH-1000XM5',
		price: 348,
		originalPrice: null,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNz2_Qy4sndx6q50agaIzw-LvL65ohGE6ZR8Sqods9jJx4SwoFHH6kpGLSxkgMongO6oGlDQV4w9FdiJEtWnw8W3t1c1ZXpZcCgE8LZH5n-HgSVfvEKQvM7WUU_e3r1_IGNPGTYUgvOa2Xom2j2IXNWxag4vElJ-gV3MiM25-uoFyEUeIBQj2GxNdZOw8bJrcN1QS5dEIpbGPC7AOdowZmVdtWdgmllJVR9ZtfLfDL96z1_OB4TbOD0Pukl5AHFSlnEWDTbcAQAtRN',
		isFavorite: false,
		isNew: false,
		category: 'Audio',
	},
	{
		id: '6',
		name: 'AirPods Pro Gen 2',
		price: 249,
		originalPrice: null,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_zcz0K41Fkfw8JUBZhWXNX-hUQbQ5qWYEjndAx1DLvN9erhPCwQ5B2QDm4eGqbyfgz6y1o4Ps43ROQwFtOAG7kxsso1Lb4Pg1leo1odvMWDM9aDyDjxfCIgRBoqMpmWP8vaw2ZD7fkPXwCbSKwFJ6Ph1HAqqWqpoZHxXAJvsZZyPNN8Bj0luVqFlwXepjWv5E466Z9XNbRYgRoctDOG2MQIwQY8NxY-hYsi7EFWPpRtdfgHkPUD-VJGpOm0HN98yxUdC6byYXJNm1',
		isFavorite: false,
		isNew: false,
		category: 'Audio',
	},
	{
		id: '7',
		name: 'Galaxy Watch 6',
		price: 249,
		originalPrice: 299,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoL1oIJ-IoTiCcmypQw5JFVWI92EwHCIBagkn-YiPg2jfUkke-gG67sB6oDgjgSV2OpSStl3WUfGDCozW7JWmU4_8dINjXEH7Rz6OwNkuCTGpJXUvpjfD3oZTguUCdIYtyvpHDwbUN7lkIY_Vucl68ZXCXuzOQHcTpUdWb0klShmhKTij2vWMcPI2KpQWjSP7xoEK4KGZwJ2yGMCq5KX5L8ZSMgIiUVTcE-dI1FidSo88wczV8wJj7DAONS_jhubF87YUTKkW_8QAu',
		isFavorite: false,
		isNew: false,
		category: 'Wearables',
	},
];

const categories = ['All', 'Electronics', 'Fashion', 'Home'];
const trendingTopics = [
	{ id: '1', name: 'Cyberpunk Aesthetics', icon: 'trending-up', color: '#2badee' },
	{ id: '2', name: 'Fast Chargers', icon: 'lightning-bolt', color: '#10b981' },
	{ id: '3', name: 'Limited Drops', icon: 'fire', color: '#f97316' },
];

export default function SearchScreen() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [recentSearches, setRecentSearches] = useState<string[]>([]);
	const [showResults, setShowResults] = useState(false);
	const [error, setError] = useState<{ type: string; message: string } | null>(null);

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
	}, [searchQuery, selectedCategory]);

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
							{item.originalPrice && (
								<Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
							)}
							<Text style={styles.price}>${item.price.toFixed(2)}</Text>
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

				{!error && (
					// Search Results
					<View style={styles.resultsSection}>
						<Text style={styles.resultsTitle}>
							Results for "{searchQuery}" ({filteredProducts.length})
						</Text>
						{filteredProducts.length > 0 ? (
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
				)}
				</>
				)}
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
